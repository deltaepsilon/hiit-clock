/* global window */
import schema from '../components/schema';
import constants from '../components/constants';

export default async function saveTimer({ currentUser = {}, timer, timerId }) {
  const { uid } = currentUser;
  const userTimerRef = schema.getUserTimerRef(uid || 'guest', timerId);

  saveToLocalStorage({ timerId: userTimerRef.id, timer });

  console.log({ currentUser, timer, timerId });
}

function saveToLocalStorage({ timerId, timer }) {
  const localTimersString = localStorage.getItem(constants.LOCALSTORAGE.TIMERS) || '{}';
  const localTimers = JSON.parse(localTimersString);

  localTimers[timerId] = timer;

  localStorage.setItem(constants.LOCALSTORAGE.TIMERS, JSON.stringify(localTimers));
}

function saveDataUrl({ dataUrl, key }) {}
