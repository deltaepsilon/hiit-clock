/* globals window */
import { useCallback, useContext, useEffect, useState } from 'react';
import { AuthenticationContext } from '../contexts/authentication-context';
import constants from '../constants';
import schema from '../schema';

const DEFAULT_TIMER = {
  periods: [],
  name: '',
};

export default function useTimer({ timerId, userId }) {
  const { currentUser } = useContext(AuthenticationContext);
  const [timer, setTimer] = useState(DEFAULT_TIMER);
  const setTimerWithPrepare = useCallback(
    timer => {
      const periods = [constants.PREPARE_PERIOD, ...timer.periods];

      return setTimer({ ...timer, periods });
    },
    [setTimer]
  );

  useEffect(() => {
    if (timerId) {
      const timerIsOwned = currentUser && currentUser.uid == userId;

      timerIsOwned && updateTimer({ timerId, userId });

      return subscribe({ timerId, userId, setTimerWithPrepare });
    }
  }, [timerId, currentUser]);

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

async function updateTimer({ userId, timerId }) {
  const timerRef = schema.getUserTimerRef(userId, timerId);

  await timerRef.update({ lastAccessed: Date.now() });
}
