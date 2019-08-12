/* globals window */
import { useEffect, useMemo, useState } from 'react';
import calculateTimerTotalSeconds from '../../utilities/calculate-timer-total-seconds';
import schema from '../schema';
import constants from '../constants';
import { interval } from 'rxjs';

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

export default function useRtdbTimer({ uid }) {
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [timer, setTimer] = useState(DEFAULT_TIMER);
  const [state, setState] = useState(DEFAULT_STATE);
  const ref = useMemo(() => schema.getTimerStateRef(uid), [uid]);
  const totalSeconds = useMemo(() => calculateTimerTotalSeconds(timer || DEFAULT_TIMER), [timer]);
  const timerState = { playState: state.playState || DEFAULT_STATE, totalSeconds };

  useEffect(() => {
    const { millisElapsed, playState, timeStarted } = state || DEFAULT_STATE;
    const intervalTracker = setInterval(() => {
      const isPlaying = playState == constants.PLAY_STATES.PLAYING;
      const millisSinceStart = isPlaying ? Date.now() - timeStarted : 0;
      const millisAccumulated = millisSinceStart + millisElapsed;
      const secondsElapsed = millisecondsToSeconds(millisAccumulated);

      setSecondsElapsed(secondsElapsed);
    }, constants.TIMES.MILLIS_TO_POLL);

    return () => clearInterval(intervalTracker);
  }, [state]);

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

  return { secondsElapsed, timer: timer || DEFAULT_TIMER, timerState };
}

function millisecondsToSeconds(millis) {
  return Math.floor(millis / 1000);
}
