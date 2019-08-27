/* globals window */
import { useCallback, useEffect, useState } from 'react';
import constants from '../constants';
import schema from '../schema';

const DEFAULT_TIMER = {
  periods: [],
  name: '',
};

export default function useTimer({ timerId, userId }) {
  const [timer, setTimer] = useState(DEFAULT_TIMER);
  const setTimerWithPrepare = useCallback(
    timer => {
      const periods = [constants.PREPARE_PERIOD, ...timer.periods];

      return setTimer({ ...timer, periods });
    },
    [setTimer]
  );

  useEffect(() => (timerId ? subscribe({ timerId, userId, setTimerWithPrepare }) : () => {}), [
    timerId,
  ]);

  return timer;
}

function subscribe({ userId, timerId, setTimerWithPrepare }) {
  const localTimersString = localStorage.getItem(constants.LOCALSTORAGE.TIMERS) || '{}';
  const localTimers = JSON.parse(localTimersString);
  const localTimer = localTimers[timerId];
  const timerRef = schema.getUserTimerRef(userId, timerId);

  setTimerWithPrepare({ ...DEFAULT_TIMER, ...localTimer });

  return timerRef.onSnapshot(doc => {
    const dbTimer = doc.data();

    if (dbTimer) {
      const updatedLocalTimers = {
        ...localTimers,
        [timerId]: {
          ...dbTimer,
          algolia: undefined,
          index: undefined,
          uid: userId,
          lastAccessed: Date.now(),
        },
      };
      const updatedLocalTimersString = JSON.stringify(updatedLocalTimers);

      localStorage.setItem(constants.LOCALSTORAGE.TIMERS, updatedLocalTimersString);
      setTimerWithPrepare({ ...DEFAULT_TIMER, ...dbTimer });
    }
  });
}
