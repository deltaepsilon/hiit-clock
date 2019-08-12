import { useContext, useEffect, useMemo, useState } from 'react';
import { AuthenticationContext } from '../contexts/authentication-context';
import calculateTimerTotalSeconds from '../../utilities/calculate-timer-total-seconds';
import getCurrentPeriodStats from '../../utilities/get-current-period-stats';
import debounceAsync from '../../utilities/debounce-async';
import externalEffects from '../../effects';
import constants from '../constants';

const debouncedSaveTimerState = debounceAsync(externalEffects.saveTimerState, 1000);

const DEFAULT_OPTIONS = {
  onSecondsElapsed: () => {},
};

export default (timerId, timer, { onSecondsElapsed } = DEFAULT_OPTIONS) => {
  const { currentUser } = useContext(AuthenticationContext) || {};
  const [initialized, setInitialized] = useState(false);
  const [totalMillis, setTotalMillis] = useState(0);
  const [playState, setPlayState] = useState(constants.PLAY_STATES.STOPPED);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [millisElapsed, setMillisElapsed] = useState(0);
  const [timeStarted, setTimeStarted] = useState(null);
  const [intervalTracker, setIntervalTracker] = useState(null);
  const [cacheBust, setCacheBust] = useState(0);

  useEffect(() => onSecondsElapsed(secondsElapsed), [secondsElapsed]);

  useEffect(() => setSecondsElapsed(millisecondsToSeconds(millisElapsed)), [millisElapsed]);

  useEffect(() => {
    const state = getTimerState();
    const uid = currentUser && currentUser.uid;

    uid && debouncedSaveTimerState({ state, timer, userId: uid });
  }, [currentUser, timer]);

  useEffect(
    () =>
      function onUnmount() {
        transactTimerState({ currentUser, timerId }, timerState => {
          const timer = timerState[timerId];
          const isPlaying = timer && timer.playState == constants.PLAY_STATES.PLAYING;

          if (timerId && isPlaying) {
            const accumulatedMillis = getAccumulatedMillis(timer.timeStarted, timer.millisElapsed);
            const millisElapsed = accumulatedMillis;
            const timeStarted = Date.now();
            const updatedTimerState = { ...timer, millisElapsed, timeStarted };

            timerState[timerId] = updatedTimerState;
          }

          return timerState;
        });
      },
    [timerId, currentUser, timerId]
  );

  useEffect(
    function onTimerChanged() {
      if (!initialized && timer.periods.length) {
        const totalSeconds = calculateTimerTotalSeconds(timer);
        const totalMillis = secondsToMilliseconds(totalSeconds);

        setTotalMillis(totalMillis);

        const timerState = getTimerState();
        const { playState, millisElapsed, timeStarted } = timerState[timerId] || {};
        const isPlaying = playState == constants.PLAY_STATES.PLAYING;

        playState && setPlayState(playState);
        timeStarted && setTimeStarted(timeStarted);

        if (timeStarted && isPlaying) {
          updateMillisElapsed(millisElapsed);
          /**
           * updateMillisElapsed sets timeStarted to now and sets millisElapsed
           */
        } else {
          millisElapsed && setMillisElapsed(millisElapsed);
        }

        setInitialized(true);
      }
    },
    [timer]
  );

  useEffect(
    function saveTimerToLocalStorage() {
      const shouldUpdate = !!timerId && initialized;

      shouldUpdate &&
        transactTimerState({ currentUser, timerId }, timerState => {
          timerState[timerId] = { playState, millisElapsed, timeStarted };

          return timerState;
        });
    },
    [currentUser, timerId, playState, millisElapsed, initialized]
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

  function handleNextTick() {
    const accumulatedMillisElapsed = getAccumulatedMillis(timeStarted, millisElapsed);
    const shouldStop = accumulatedMillisElapsed >= totalMillis;

    if (shouldStop) {
      stop();
      setMillisElapsed(totalMillis);
    } else {
      setMillisElapsed(accumulatedMillisElapsed);
    }
  }

  function play() {
    setTimeStarted(Date.now());
    setPlayState(constants.PLAY_STATES.PLAYING);
  }

  function stop() {
    setPlayState(constants.PLAY_STATES.STOPPED);
  }

  function pause() {
    setPlayState(constants.PLAY_STATES.PAUSED);
  }

  function forward(e, adjustmentSeconds = 0) {
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
  }

  function backward(e, adjustmentSeconds = 0) {
    const adjustmentMillis = secondsToMilliseconds(adjustmentSeconds);
    const secondsElapsed = millisecondsToSeconds(millisElapsed + adjustmentMillis);
    const stats = getCurrentPeriodStats(timer.periods, secondsElapsed);

    if (!stats) return;

    const periodMillisElapsed = secondsToMilliseconds(stats.periodSecondsElapsed);
    const millisToRemove = periodMillisElapsed - adjustmentMillis;
    const willReverse = millisToRemove > 0;

    if (!willReverse) {
      backward(null, 1);
    } else {
      const updatedMillisElapsed = Math.min(totalMillis, millisElapsed - millisToRemove);

      updateMillisElapsed(updatedMillisElapsed);
    }
  }

  function skipForward() {
    const millisToSkip = secondsToMilliseconds(constants.TIMES.SECONDS_TO_SKIP);
    const updatedMillisElapsed = Math.min(totalMillis, millisElapsed + millisToSkip);

    updateMillisElapsed(updatedMillisElapsed);
  }

  function skipBackward() {
    const millisToSkip = secondsToMilliseconds(constants.TIMES.SECONDS_TO_SKIP);
    const updatedMillisElapsed = Math.max(0, millisElapsed - millisToSkip);

    updateMillisElapsed(updatedMillisElapsed);
  }

  function replay() {
    bustCache();
    setMillisElapsed(0);
  }

  function updateMillisElapsed(updatedMillisElapsed) {
    setMillisElapsed(updatedMillisElapsed);
    setTimeStarted(Date.now());
    bustCache();
  }

  function bustCache() {
    clearTimerInterval();
    setCacheBust(Date.now());
  }

  function clearTimerInterval() {
    if (intervalTracker) {
      clearInterval(intervalTracker);
      setIntervalTracker(null);
    }
  }

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

function getAccumulatedMillis(timeStarted, millisElapsed) {
  const millisSinceStart = Date.now() - timeStarted;
  const accumulatedMillisElapsed = millisSinceStart + millisElapsed;

  return accumulatedMillisElapsed;
}

function millisecondsToSeconds(millis) {
  return Math.floor(millis / 1000);
}

function secondsToMilliseconds(seconds) {
  return seconds * 1000;
}

function transactTimerState({ currentUser, timerId }, transaction) {
  const timerState = getTimerState();
  const updatedTimerState = transaction(timerState);
  const uid = currentUser && currentUser.uid;
  const state = updatedTimerState[timerId];

  setTimerState(updatedTimerState);
  uid && debouncedSaveTimerState({ state, userId: uid });
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
