/* global window */
import schema from '../components/schema';
import constants from '../components/constants';
import dataUrlToBlob from '../utilities/data-url-to-blob';
import recursivelyOmitEmptyValues from '../utilities/recursively-omit-empty-values';

export default async function saveTimer({ currentUser = {}, timer, timerId }) {
  const { uid } = currentUser;
  const userTimerRef = schema.getUserTimerRef(uid || 'guest', timerId);

  saveToLocalStorage({ timerId: userTimerRef.id, timer });

  if (uid) {
    const timerWithImages = await saveImages({ uid, timer });

    await saveToDb({ currentUser, timer: timerWithImages, timerId });
  }
}

function saveToLocalStorage({ timerId, timer }) {
  const localTimersString = localStorage.getItem(constants.LOCALSTORAGE.TIMERS) || '{}';
  const localTimers = JSON.parse(localTimersString);

  localTimers[timerId] = timer;

  localStorage.setItem(constants.LOCALSTORAGE.TIMERS, JSON.stringify(localTimers));
}

async function saveImages({ uid, timer }) {
  const timerWithImages = { ...timer };
  const timerFile = timer.file;

  if (timerFile.dataUrl) {
    timerWithImages.file = await saveDataUrl({
      uid,
      file: timerFile,
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

async function saveDataUrl({ uid, file }) {
  const userStorageRef = schema.getUserStorageRef(uid);
  const imageRef = userStorageRef.child(file.key);
  const blob = await dataUrlToBlob(file.dataUrl);
  const snapshot = await imageRef.put(blob);
  const downloadURL = await snapshot.ref.getDownloadURL();
  const storagePath = snapshot.ref.toString();
  const { totalBytes, metadata } = snapshot;

  return { downloadURL, storagePath, totalBytes, metadata, key: file.key };
}

async function saveToDb({ currentUser, timer, timerId }) {
  const userTimerRef = schema.getUserTimerRef(currentUser.uid, timerId);
  const cleanedTimer = recursivelyOmitEmptyValues(timer);

  return userTimerRef.set(cleanedTimer);
}
