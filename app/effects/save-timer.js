/* global window */
import schema from '../components/schema';
import constants from '../components/constants';
import dataUrlToBlob from '../utilities/data-url-to-blob';
import recursivelyOmitEmptyValues from '../utilities/recursively-omit-empty-values';
import calculateTimerTotalSeconds from '../utilities/calculate-timer-total-seconds';

export default async function saveTimer({ currentUser, isOwned, timer, timerId }) {
  const { isAnonymous, uid } = currentUser;
  const userTimerRef = schema.getUserTimerRef(uid || 'guest', timerId);

  saveToLocalStorage({ timerId: userTimerRef.id, timer, uid });

  if (uid && !isAnonymous) {
    const timerWithImages = await saveImages({ isOwned, timer, timerId: userTimerRef.id, uid });

    await saveToDb({ currentUser, isOwned, timer: timerWithImages, timerId: userTimerRef.id });
  }
}

function saveToLocalStorage({ timerId, timer, uid }) {
  const localTimersString = localStorage.getItem(constants.LOCALSTORAGE.TIMERS) || '{}';
  const localTimers = JSON.parse(localTimersString);

  localTimers[timerId] = { ...timer, index: null, algolia: null, uid };

  localStorage.setItem(constants.LOCALSTORAGE.TIMERS, JSON.stringify(localTimers));
}

async function saveImages({ isOwned, timer, timerId, uid }) {
  const filesToUpload = getUniqueFilesToUpload({ isOwned, timer });
  const uploadPromises = filesToUpload.map(async file => {
    let result = file;

    try {
      result = await saveFile({ file, timerId, uid });
    } catch (error) {
      console.error(error);
    }

    return result;
  });

  const files = await Promise.all(uploadPromises);
  const timerWithFiles = attachFilesToTimer({ timer, files });

  return timerWithFiles;

  /**
   * TODO: Delete files with a Cloud Function if the record is ever deleted.
   */
}

async function saveFile({ file, timerId, uid }) {
  const userStorageRef = schema.getUserTimerStorageRef(uid, timerId);
  const imageRef = userStorageRef.child(file.key);
  const blob = await dataUrlToBlob(file.dataUrl || file.downloadURL);
  const snapshot = await imageRef.put(blob);
  const downloadURL = await snapshot.ref.getDownloadURL();
  const storagePath = snapshot.ref.toString();
  const { totalBytes, metadata } = snapshot;

  return { downloadURL, storagePath, totalBytes, metadata, key: file.key };
}

function getUniqueFilesToUpload({ isOwned, timer }) {
  const timerFile = timer.file || {};
  const periodFiles = timer.periods.map(period => period.file).filter(file => !!file && !!file.key);
  const files = [timerFile, ...periodFiles];
  const fileKeysToUpload = getFileKeysToUpload({ files, isOwned });
  const fileKeys = Array.from(new Set(fileKeysToUpload));
  const result = findFilesToUpload({ fileKeys, files, isOwned });

  return result;
}

function getFileKeysToUpload({ files, isOwned }) {
  return files
    .filter(file => {
      const hasFile = !!file;
      const hasDataUrl = hasFile && file.dataUrl;
      const hasUnownedDownloadUrl = hasFile && !isOwned && file.downloadURL;

      return hasDataUrl || hasUnownedDownloadUrl;
    })
    .map(({ key }) => key);
}

function findFilesToUpload({ fileKeys, files, isOwned }) {
  return fileKeys.map(key =>
    files.find(file => {
      const isMatchingFile = file.key == key;
      const isUpload = !!file.dataUrl;
      const isUnownedDownloadUrl = !isOwned && !!file.downloadURL;

      return isMatchingFile && (isUpload || isUnownedDownloadUrl);
    })
  );
}

function attachFilesToTimer({ timer, files }) {
  const filesMap = files.reduce((filesMap, file) => {
    filesMap[file.key] = file;

    return filesMap;
  }, {});
  const timerFile = getFileFromMap(timer, filesMap);
  const periods = timer.periods.map(period => {
    const periodFile = getFileFromMap(period, filesMap);

    return { ...period, file: periodFile };
  });

  return { ...timer, file: timerFile || timer.file, periods };
}

function getFileFromMap(item, itemsMap) {
  return (item.file && itemsMap[item.file.key]) || item.file;
}

async function saveToDb({ currentUser, isOwned, timer, timerId }) {
  const { uid } = currentUser;
  const userTimerRef = schema.getUserTimerRef(uid, timerId);
  const personalTimer = getPersonalTimer({ currentUser, timer });
  const cleanedTimer = recursivelyOmitEmptyValues(personalTimer);

  return userTimerRef.set(cleanedTimer);
}

function getPersonalTimer({ currentUser, timer }) {
  const { email, uid } = currentUser;
  const periods = timer.periods.map(period => ({
    id: period.id,
    name: period.name,
    totalSeconds: period.totalSeconds,
    type: period.type,
    file: period.file,
  }));
  const totalSeconds = calculateTimerTotalSeconds({ periods });
  const search = timer.isSearchable
    ? {
        algolia: {
          name: timer.name,
          description: timer.description,
          totalSeconds,
          email,
          uid,
        },
        index: constants.ALGOLIA.DB_INDICES.TIMERS,
      }
    : {
        algolia: undefined,
        index: undefined,
      };
  const result = { ...timer, ...search, periods, uid };

  return result;
}
