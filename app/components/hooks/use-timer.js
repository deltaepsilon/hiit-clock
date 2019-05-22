/* globals window */
import { useState, useEffect } from 'react';
import constants from '../constants';
import schema from '../schema';

const defaultTimer = {
  periods: [],
  tags: [],
  name: '',
};

export default function useTimer({ timerId, userId }) {
  const [timer, setTimer] = useState(defaultTimer);

  useEffect(() => (timerId ? subscribe({ timerId, userId, setTimer }) : () => {}), [timerId]);

  return timer;
}

function subscribe({ userId, timerId, setTimer }) {
  const localTimersString = localStorage.getItem(constants.LOCALSTORAGE.TIMERS) || '{}';
  const localTimers = JSON.parse(localTimersString);
  const localTimer = localTimers[timerId];
  const timerRef = schema.getUserTimerRef(userId, timerId);

  setTimer({ ...defaultTimer, ...localTimer });

  return timerRef.onSnapshot(doc => {
    const dbTimer = doc.data();

    if (dbTimer) {
      const updatedLocalTimers = {
        ...localTimers,
        [timerId]: { ...dbTimer, algolia: undefined, index: undefined },
      };
      const updatedLocalTimersString = JSON.stringify(updatedLocalTimers);

      localStorage.setItem(constants.LOCALSTORAGE.TIMERS, updatedLocalTimersString);
      setTimer({ ...defaultTimer, ...dbTimer });
    }
  });
}
