import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { AuthenticationContext } from '../contexts/authentication-context';
import calculateTimerTotalSeconds from '../../utilities/calculate-timer-total-seconds';
import getCurrentPeriodStats from '../../utilities/get-current-period-stats';
import externalEffects from '../../effects';
import constants from '../constants';

const DEFAULT_OPTIONS = {
  onSecondsElapsed: () => {},
};
const NOOP = () => {};

export default (timerId, timer, { onSecondsElapsed } = DEFAULT_OPTIONS) => {
  const [saveTimerState, setSaveTimerState] = useState(NOOP);
  const { currentUser } = useContext(AuthenticationContext) || {};
  const [initialized, setInitialized] = useState(false);
  const [totalMillis, setTotalMillis] = useState(0);
  const [playState, setPlayState] = useState(constants.PLAY_STATES.STOPPED);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [millisElapsed, setMillisElapsed] = useState(null);
  const [accumulatedMillisElapsed, setAccumulatedMillisElapsed] = useState(null);
  const [timeStarted, setTimeStarted] = useState(null);
  const [, setIntervalTracker] = useState(null);
  const [cacheBust, setCacheBust] = useState(0);

  const clearTimerInterval = useCallback(() => {
    setIntervalTracker(intervalTracker => {
      intervalTracker && clearInterval(intervalTracker);
      return null;
    });
  }, [setIntervalTracker]);

  const bustCache = useCallback(() => {
    clearTimerInterval();
    setCacheBust(Date.now());
  }, [clearTimerInterval, setCacheBust]);

  const updateMillisElapsed = useCallback(
    updatedMillisElapsed => {
      setMillisElapsed(updatedMillisElapsed);
      setAccumulatedMillisElapsed(updatedMillisElapsed);
      setTimeStarted(Date.now());
      bustCache();
    },
    [bustCache, setAccumulatedMillisElapsed, setMillisElapsed, setTimeStarted]
  );

  const { play, stop, pause } = useMemo(
    () => ({
      play: () => {
        setTimeStarted(Date.now());
        setPlayState(constants.PLAY_STATES.PLAYING);
      },
      stop: () => {
        setPlayState(constants.PLAY_STATES.STOPPED);
      },
      pause: () => {
        setAccumulatedMillisElapsed(millisElapsed);
        setPlayState(constants.PLAY_STATES.PAUSED);
      },
    }),
    [
      accumulatedMillisElapsed,
      millisElapsed,
      setAccumulatedMillisElapsed,
      setTimeStarted,
      setPlayState,
    ]
  );

  const skipForward = useCallback(() => {
    const millisToSkip = secondsToMilliseconds(constants.TIMES.SECONDS_TO_SKIP);
    const updatedMillisElapsed = Math.min(totalMillis, millisElapsed + millisToSkip);

    updateMillisElapsed(updatedMillisElapsed);
  }, [millisElapsed, totalMillis, updateMillisElapsed]);

  const skipBackward = useCallback(() => {
    const millisToSkip = secondsToMilliseconds(constants.TIMES.SECONDS_TO_SKIP);
    const updatedMillisElapsed = Math.max(0, millisElapsed - millisToSkip);

    updateMillisElapsed(updatedMillisElapsed);
  }, [millisElapsed, updateMillisElapsed]);

  const replay = useCallback(() => {
    bustCache();
    setAccumulatedMillisElapsed(0);
    setMillisElapsed(0);
  }, [bustCache, setAccumulatedMillisElapsed, setMillisElapsed]);

  const forward = useCallback(
    (e, adjustmentSeconds = 0) => {
      const adjustmentMillis = secondsToMilliseconds(adjustmentSeconds);
      const secondsElapsed = millisecondsToSeconds(millisElapsed + adjustmentMillis);
      const stats = getCurrentPeriodStats(timer.periods, secondsElapsed);

      if (!stats) return;

      const willAdvance = stats.remainder > 0;

      if (!willAdvance) {
        forward(null, 1);
      } else {
        const remainderMillis = secondsToMilliseconds(stats.remainder);
        const updatedMillisElapsed = Math.min(
          totalMillis,
          millisElapsed + remainderMillis + adjustmentMillis
        );

        updateMillisElapsed(updatedMillisElapsed);
      }
    },
    [millisElapsed, secondsElapsed, timer, totalMillis, updateMillisElapsed]
  );

  const backward = useCallback(
    (e, adjustmentSeconds = 0) => {
      const adjustmentMillis = secondsToMilliseconds(adjustmentSeconds);
      const secondsElapsed = millisecondsToSeconds(millisElapsed + adjustmentMillis);
      const stats = getCurrentPeriodStats(timer.periods, secondsElapsed);

      if (!stats) return;

      const periodMillisElapsed = secondsToMilliseconds(stats.periodSecondsElapsed);
      const millisToRemove = periodMillisElapsed - adjustmentMillis;
      const willReverse = millisToRemove > 0;

      if (willReverse) {
        const updatedMillisElapsed = Math.min(totalMillis, millisElapsed - millisToRemove);

        updateMillisElapsed(updatedMillisElapsed);
      }
    },
    [millisElapsed, secondsElapsed, timer, totalMillis, updateMillisElapsed]
  );

  const handleNextTick = useCallback(() => {
    const millisElapsed = getAccumulatedMillis(timeStarted, accumulatedMillisElapsed);
    const shouldStop = millisElapsed >= totalMillis;

    if (shouldStop) {
      stop();
      setMillisElapsed(totalMillis);
    } else {
      setMillisElapsed(millisElapsed);
    }
  }, [accumulatedMillisElapsed, millisElapsed, setMillisElapsed, timeStarted, totalMillis]);

  useEffect(() => {
    onSecondsElapsed(secondsElapsed);
  }, [secondsElapsed]);

  useEffect(() => {
    setSecondsElapsed(millisecondsToSeconds(millisElapsed));
  }, [millisElapsed]);

  useEffect(() => {
    const uid = currentUser && currentUser.uid;
    const saveTimerState = uid ? externalEffects.getSaveTimerState({ uid }) : NOOP;

    setSaveTimerState(() => saveTimerState);

    saveTimerState({ timer });
  }, [currentUser, timer, timerId]);

  useEffect(() => {
    const state = { accumulatedMillisElapsed, playState, timeStarted, updated: Date.now() };

    saveTimerState && saveTimerState({ state });
  }, [accumulatedMillisElapsed, playState, saveTimerState, timeStarted]);

  useEffect(
    function onTimerChanged() {
      if (!initialized && timer.periods.length) {
        const totalSeconds = calculateTimerTotalSeconds(timer);
        const totalMillis = secondsToMilliseconds(totalSeconds);

        setTotalMillis(totalMillis);

        const timerState = getTimerState();
        const { playState, timeStarted, accumulatedMillisElapsed } = timerState[timerId] || {};

        playState && setPlayState(playState);
        timeStarted && setTimeStarted(timeStarted);
        accumulatedMillisElapsed && setAccumulatedMillisElapsed(accumulatedMillisElapsed);

        setInitialized(true);
      }
    },
    [timer, setPlayState, setTimeStarted, setAccumulatedMillisElapsed]
  );

  useEffect(
    function saveTimerToLocalStorage() {
      const shouldUpdate = !!timerId && initialized;

      shouldUpdate &&
        transactTimerState(timerState => {
          timerState[timerId] = { playState, accumulatedMillisElapsed, timeStarted };

          return timerState;
        });
    },
    [accumulatedMillisElapsed, initialized, millisElapsed, playState, timerId, timeStarted]
  );

  useEffect(
    function handleInterval() {
      let localIntervalTracker;

      if (playState == constants.PLAY_STATES.PLAYING) {
        clearTimerInterval();

        localIntervalTracker = setInterval(handleNextTick, constants.TIMES.MILLIS_TO_POLL);

        setIntervalTracker(localIntervalTracker);
      } else {
        clearTimerInterval();
      }

      return () => clearInterval(localIntervalTracker);
    },
    [timer, playState, cacheBust]
  );

  const effects = {
    play,
    stop,
    pause,
    forward,
    backward,
    skipForward,
    skipBackward,
    replay,
  };

  const result = useMemo(
    () => ({
      secondsElapsed,
      totalSeconds: millisecondsToSeconds(totalMillis),
      playState,
      effects: instrumentEffects(effects),
    }),
    [secondsElapsed, totalMillis, playState]
  );

  return result;
};

function getAccumulatedMillis(timeStarted, accumulatedMillisElapsed) {
  const millisSinceStart = Date.now() - timeStarted;
  const millisAccumulated = millisSinceStart + accumulatedMillisElapsed;

  return millisAccumulated;
}

function millisecondsToSeconds(millis) {
  return Math.floor(millis / 1000);
}

function secondsToMilliseconds(seconds) {
  return seconds * 1000;
}

function transactTimerState(transaction) {
  const prevTimersState = getTimerState();
  const nextTimersState = transaction(prevTimersState);

  setTimerState(nextTimersState);
}

function getTimerState() {
  return JSON.parse(localStorage.getItem(constants.LOCALSTORAGE.TIMER_STATE) || '{}');
}

function setTimerState(timerState) {
  localStorage.setItem(constants.LOCALSTORAGE.TIMER_STATE, JSON.stringify(timerState));
}

function instrumentEffects(unwrappedEffects) {
  const effects = {};

  for (const key in unwrappedEffects) {
    const effect = unwrappedEffects[key];

    effects[key] = wrapEffect(effect);
  }

  return effects;
}

function wrapEffect(func) {
  return (...args) => {
    // console.info({ func: func.name, args });
    func(...args);
  };
}
