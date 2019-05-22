/* global window */
import schema from '../components/schema';
import constants from '../components/constants';

export default async function deleteTimer({ currentUser = {}, timerId }) {
  const { uid } = currentUser;
  const userTimerRef = schema.getUserTimerRef(uid || 'guest', timerId);

  removeFromLocalStorage({ timerId: userTimerRef.id });
}

function removeFromLocalStorage({ timerId }) {
  const localTimersString = localStorage.getItem(constants.LOCALSTORAGE.TIMERS) || '{}';
  const localTimers = JSON.parse(localTimersString);

  delete localTimers[timerId];

  localStorage.setItem(constants.LOCALSTORAGE.TIMERS, JSON.stringify(localTimers));
}

function saveDataUrl({ dataUrl, key }) {}
