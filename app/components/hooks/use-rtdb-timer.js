/* globals window */
import { useEffect, useMemo, useState } from 'react';
import calculateTimerTotalSeconds from '../../utilities/calculate-timer-total-seconds';
import schema from '../schema';
import constants from '../constants';

const DEFAULT_STATE = {
  accumulatedMillisElapsed: 0,
  playState: constants.PLAY_STATES.PAUSED,
  timeStarted: Date.now(),
};
const DEFAULT_TIMER = {
  description: '',
  file: {},
  name: '',
  periods: [],
};

export default function useRtdbTimer({ uid }) {
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [timer, setTimer] = useState(DEFAULT_TIMER);
  const [state, setState] = useState(DEFAULT_STATE);
  const ref = useMemo(() => schema.getTimerStateRef(uid), [uid]);
  const totalSeconds = useMemo(() => calculateTimerTotalSeconds(timer || DEFAULT_TIMER), [timer]);
  const timerState = { playState: state.playState || DEFAULT_STATE, totalSeconds };

  useEffect(() => {
    const { accumulatedMillisElapsed, millisCorrection, playState, timeStarted } =
      state || DEFAULT_STATE;
    const isPlaying = playState == constants.PLAY_STATES.PLAYING;

    if (isPlaying) {
      const intervalTracker = setInterval(() => {
        const millisSinceStart = Date.now() - timeStarted;
        const millisAccumulated = millisSinceStart + accumulatedMillisElapsed - millisCorrection;
        const secondsElapsed = millisecondsToSeconds(millisAccumulated);

        setSecondsElapsed(secondsElapsed);
      }, constants.TIMES.MILLIS_TO_POLL);

      return () => clearInterval(intervalTracker);
    } else {
      const secondsElapsed = millisecondsToSeconds(accumulatedMillisElapsed);

      setSecondsElapsed(secondsElapsed);
    }
  }, [state]);

  useEffect(() => {
    const stateRef = ref.child('state');
    const timerRef = ref.child('timer');

    const stateHandler = stateRef.on('value', snapshot => {
      const state = snapshot.val();

      state.millisCorrection = Date.now() - state.updated;

      setState(state);
    });

    const timerHandler = timerRef.on('value', snapshot => {
      const timer = snapshot.val();

      setTimer(timer);
    });

    return () => {
      stateRef.off('value', stateHandler);
      timerRef.off('value', timerHandler);
    };
  }, [ref]);

  return { secondsElapsed, timer: timer || DEFAULT_TIMER, timerState };
}

function millisecondsToSeconds(millis) {
  return Math.floor(millis / 1000);
}
