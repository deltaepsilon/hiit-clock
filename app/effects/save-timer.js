/* global window */
import schema from '../components/schema';
import constants from '../components/constants';
import dataUrlToBlob from '../utilities/data-url-to-blob';
import recursivelyOmitEmptyValues from '../utilities/recursively-omit-empty-values';

export default async function saveTimer({ currentUser, isOwned, timer, timerId }) {
  const { isAnonymous, uid } = currentUser;
  const userTimerRef = schema.getUserTimerRef(uid || 'guest', timerId);

  saveToLocalStorage({ timerId: userTimerRef.id, timer, uid });

  if (uid && !isAnonymous) {
    const timerWithImages = await saveImages({ isOwned, timer, timerId: userTimerRef.id, uid });

    await saveToDb({ isOwned, timer: timerWithImages, timerId: userTimerRef.id, uid });
  }
}

function saveToLocalStorage({ timerId, timer, uid }) {
  const localTimersString = localStorage.getItem(constants.LOCALSTORAGE.TIMERS) || '{}';
  const localTimers = JSON.parse(localTimersString);

  localTimers[timerId] = { ...timer, index: null, algolia: null, uid };

  localStorage.setItem(constants.LOCALSTORAGE.TIMERS, JSON.stringify(localTimers));
}

async function saveImages({ isOwned, timer, timerId, uid }) {
  const filesToUpload = getUniqueFilesWithDataUrl({ timer });
  const uploadPromises = filesToUpload.map(async file => saveDataUrl({ file, timerId, uid }));
  const files = await Promise.all(uploadPromises);
  const timerWithFiles = attachFilesToTimer({ timer, files });

  return timerWithFiles;

  /**
   * TODO: Duplicate images if the image is not owned by the user
   *
   * TODO: Delete files with a Cloud Function if the record is ever deleted.
   */
}

async function saveDataUrl({ file, timerId, uid }) {
  const userStorageRef = schema.getUserTimerStorageRef(uid, timerId);
  const imageRef = userStorageRef.child(file.key);
  const blob = await dataUrlToBlob(file.dataUrl);
  const snapshot = await imageRef.put(blob);
  const downloadURL = await snapshot.ref.getDownloadURL();
  const storagePath = snapshot.ref.toString();
  const { totalBytes, metadata } = snapshot;

  return { downloadURL, storagePath, totalBytes, metadata, key: file.key };
}

function getUniqueFilesWithDataUrl({ timer }) {
  const timerFile = timer.file || {};
  const periodFiles = timer.periods.map(period => period.file).filter(file => !!file && !!file.key);
  const filesToUpload = [timerFile, ...periodFiles];
  const fileKeysWithDataUrl = filesToUpload
    .filter(file => file && file.dataUrl)
    .map(({ key }) => key);
  const fileKeysSet = new Set(fileKeysWithDataUrl);
  const result = [...fileKeysSet].map(key =>
    filesToUpload.find(file => file.dataUrl && file.key == key)
  );

  return result;
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

async function saveToDb({ isOwned, timer, timerId, uid }) {
  const userTimerRef = schema.getUserTimerRef(uid, timerId);
  const personalTimer = getPersonalTimer({ timer, uid });
  const cleanedTimer = recursivelyOmitEmptyValues(personalTimer);

  return userTimerRef.set(cleanedTimer);
}

function getPersonalTimer({ timer, uid }) {
  const periods = timer.periods.map(period => ({
    id: period.id,
    name: period.name,
    totalSeconds: period.totalSeconds,
    type: period.type,
    file: period.file,
  }));
  const search = timer.isSearchable
    ? {
        algolia: {
          name: timer.name,
          description: timer.description,
          totalSeconds: timer.totalSeconds,
          uid,
        },
        index: constants.ALGOLIA.DB_INDICES.TIMERS,
      }
    : {
        algolia: undefined,
        index: undefined,
      };

  return { ...timer, ...search, periods, uid };
}
