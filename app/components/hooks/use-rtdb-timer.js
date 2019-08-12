/* globals window */
import { useEffect, useMemo, useState } from 'react';
import constants from '../constants';
import schema from '../schema';
import calculateTimerTotalSeconds from '../../utilities/calculate-timer-total-seconds';

const DEFAULT_STATE = {
  millisElapsed: 0,
  playState: constants.PLAY_STATES.PAUSED,
  timeStarted: Date.now(),
};
const DEFAULT_TIMER = {
  description: '',
  file: {},
  name: '',
  periods: [],
};

export default function useRtdbTimer({ timerId, userId }) {
  const [timer, setTimer] = useState(DEFAULT_TIMER);
  const [state, setState] = useState(DEFAULT_STATE);
  const ref = useMemo(() => schema.getTimerStateRef(userId), [userId]);
  const totalSeconds = useMemo(() => calculateTimerTotalSeconds(timer || DEFAULT_TIMER), [timer]);
  const { playState, secondsElapsed } = useMemo(() => {
    const { millisElapsed, playState } = state || DEFAULT_STATE;
    const secondsElapsed = millisecondsToSeconds(millisElapsed);

    return { playState, secondsElapsed };
  }, [state]);
  const timerState = { playState, totalSeconds };

  useEffect(() => {
    (async () => {
      const snapshot = await ref.once('value');
      const { state, timer } = snapshot.val() || {};

      setState(state);
      setTimer(timer);
    })();
  }, [ref]);

  useEffect(() => {
    const stateRef = ref.child('state');
    const handler = stateRef.on('value', snapshot => {
      const state = snapshot.val();

      setState(state);
    });

    return () => stateRef.off('value', handler);
  }, [ref]);

  return { secondsElapsed, timer, timerState };
}

function millisecondsToSeconds(millis) {
  return Math.floor(millis / 1000);
}
