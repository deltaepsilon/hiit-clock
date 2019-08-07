/* global window */
import schema from '../components/schema';
import constants from '../components/constants';
import effects from '../effects';

export default async function deleteTimer({ currentUser, isOwned, timerId }) {
  const { isAnonymous, uid } = currentUser;
  const userTimerRef = schema.getUserTimerRef(uid || 'guest', timerId);

  removeFromLocalStorage({ timerId: userTimerRef.id });

  isOwned && !isAnonymous && (await userTimerRef.delete());
}

function removeFromLocalStorage({ timerId }) {
  const localTimersString = effects.localStorage.getItem(constants.LOCALSTORAGE.TIMERS) || '{}';
  const localTimers = JSON.parse(localTimersString);

  delete localTimers[timerId];

  effects.localStorage.setItem(constants.LOCALSTORAGE.TIMERS, JSON.stringify(localTimers));
}
