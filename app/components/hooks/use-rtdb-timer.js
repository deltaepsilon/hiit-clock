/* globals window */
import { useEffect, useMemo, useState } from 'react';
import calculateTimerTotalSeconds from '../../utilities/calculate-timer-total-seconds';
import schema from '../schema';
import constants from '../constants';
import effects from '../../effects';

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

export default function useRtdbTimer({ shareId = 'chromecast', uid }) {
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [timer, setTimer] = useState(DEFAULT_TIMER);
  const [state, setState] = useState(DEFAULT_STATE);
  const [correctionMillis, setCorrectionMillis] = useState(0);
  const timerStateRef = useMemo(() => uid && schema.getTimerStateRef(uid), [uid]);
  const correctionMillisRef = useMemo(
    () => uid && shareId && schema.getCorrectionMillisRef(uid, shareId),
    [shareId, uid]
  );
  const totalSeconds = useMemo(() => calculateTimerTotalSeconds(timer || DEFAULT_TIMER), [timer]);
  const timerState = { playState: state.playState || DEFAULT_STATE, totalSeconds };

  useEffect(() => {
    const { accumulatedMillisElapsed, playState, timeStarted } = state || DEFAULT_STATE;
    const isPlaying = playState == constants.PLAY_STATES.PLAYING;

    if (isPlaying) {
      const intervalTracker = setInterval(() => {
        const correctedAccumulatedMillis = accumulatedMillisElapsed - correctionMillis;
        const millisSinceStart = Date.now() - timeStarted;
        const millisAccumulated = millisSinceStart + correctedAccumulatedMillis;
        const secondsElapsed = millisecondsToSeconds(millisAccumulated);

        setSecondsElapsed(secondsElapsed);
      }, constants.TIMES.MILLIS_TO_POLL);

      return () => clearInterval(intervalTracker);
    } else {
      const correctedAccumulatedMillis = accumulatedMillisElapsed + correctionMillis;
      const isAtStart = accumulatedMillisElapsed == 0;
      const totalMillis = secondsToMilliseconds(totalSeconds);
      const isAtEnd = correctedAccumulatedMillis >= totalMillis;

      if (isAtStart) {
        setSecondsElapsed(0);
      } else if (isAtEnd) {
        setSecondsElapsed(totalSeconds);
      } else {
        const secondsElapsed = millisecondsToSeconds(accumulatedMillisElapsed || 0);

        setSecondsElapsed(secondsElapsed);
      }
    }
  }, [correctionMillis, state, timer, totalSeconds]);

  useEffect(() => {
    if (timerStateRef && correctionMillisRef) {
      const stateRef = timerStateRef.child('state');
      const stateHandler = stateRef.on('value', snapshot => {
        const state = snapshot.val();

        if (state) {
          setState(state);

          const correctionMillis = Date.now() - state.updated;

          correctionMillisRef.set(correctionMillis);
        }
      });

      const correctionMillisHandler = correctionMillisRef.on('value', snapshot => {
        const correctionMillis = snapshot.val();

        setCorrectionMillis(correctionMillis);
      });

      return () => {
        stateRef.off('value', stateHandler);
        correctionMillisRef.off('value', correctionMillisHandler);
      };
    }
  }, [correctionMillisRef, setCorrectionMillis, setState, timerStateRef]);

  useEffect(() => {
    if (timerStateRef) {
      const timerRef = timerStateRef.child('timer');
      const timerHandler = timerRef.on('value', snapshot => {
        const timer = snapshot.val();

        setTimer(timer);
      });

      return () => timerRef.off('value', timerHandler);
    }
  }, [setTimer, timerStateRef]);

  useEffect(() => {
    if (timerStateRef) {
      const settingsRef = timerStateRef.child('settings');
      const settingsHandler = settingsRef.on('value', snapshot => {
        const settings = snapshot.val() || {};

        effects.saveSettings(settings);
      });

      return () => settingsRef.off('value', settingsHandler);
    }
  }, [timerStateRef]);

  return { secondsElapsed, timer: timer || DEFAULT_TIMER, timerState };
}

function millisecondsToSeconds(millis) {
  return Math.floor(millis / 1000);
}

function secondsToMilliseconds(seconds) {
  return seconds * 1000;
}
