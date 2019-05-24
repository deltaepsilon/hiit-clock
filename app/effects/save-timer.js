/* global window */
import schema from '../components/schema';
import constants from '../components/constants';
import dataUrlToBlob from '../utilities/data-url-to-blob';
import recursivelyOmitEmptyValues from '../utilities/recursively-omit-empty-values';

export default async function saveTimer({ isOwned, timer, timerId, uid }) {
  const userTimerRef = schema.getUserTimerRef(uid || 'guest', timerId);

  saveToLocalStorage({ timerId: userTimerRef.id, timer, uid });

  if (uid) {
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
  const timerWithImages = { ...timer };
  const timerFile = timer.file;
  const hasDataUrl = timerFile && timerFile.dataUrl;

  if (hasDataUrl) {
    timerWithImages.file = await saveDataUrl({
      file: timerFile,
      timerId,
      uid,
    });
  }

  /**
   * TODO:
   * Dedupe the files. It's likely that images identical md5 hashes will overwrite each other.
   *
   * - Extract files and dedupe them
   * - Upload the files
   * - Copy file values using file.key to identify them.
   */

  /**
   * TODO: Duplicate images if the image is not owned by the user
   */
  const periodPromises = timer.periods.map(async period => {
    const updatedPeriod = { ...period };
    const hasDataUrl = period.file && period.file.dataUrl;

    if (hasDataUrl) {
      updatedPeriod.file = await saveDataUrl({ uid, file: period.file });
    }

    return updatedPeriod;
  });

  timerWithImages.periods = await Promise.all(periodPromises);

  return timerWithImages;
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
  }));

  return { ...timer, periods, uid, algolia: undefined, index: undefined };
}
