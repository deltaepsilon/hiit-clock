import { useState, useEffect } from 'react';
import calculateTimerTotalSeconds from '../../utilities/calculate-timer-total-seconds';
import constants from '../constants';
import getCurrentPeriodStats from '../../utilities/get-current-period-stats';

const UNMOUNT_COMPENSATION_SECONDS = 1;

export default (timerId, timer, { onSecondsElapsed }) => {
  const [initialized, setInitialized] = useState(false);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [playState, setPlayState] = useState(constants.PLAY_STATES.STOPPED);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [timeStarted, setTimeStarted] = useState(null);
  const [intervalTracker, setIntervalTracker] = useState(null);
  const [cacheBust, setCacheBust] = useState(0);

  useEffect(() => onSecondsElapsed(secondsElapsed), [secondsElapsed]);

  useEffect(
    () =>
      function onUnmount() {
        transactTimerState(timerState => {
          const timer = timerState[timerId];
          const isPlaying = timer && timer.playState == constants.PLAY_STATES.PLAYING;

          if (timerId && isPlaying) {
            const now = Date.now();
            const secondsSinceStart = millisecondsToSeconds(now - timer.timeStarted);
            const secondsElapsed = secondsSinceStart + timer.secondsElapsed;
            const timeStarted = now;

            timerState[timerId] = { ...timer, secondsElapsed, timeStarted };
          }

          return timerState;
        });
      },
    [timerId]
  );

  useEffect(
    function onTimerChanged() {
      if (!initialized && timer.periods.length) {
        const totalSeconds = calculateTimerTotalSeconds(timer);

        setTotalSeconds(totalSeconds);

        const timerState = getTimerState();
        const { playState, secondsElapsed, timeStarted } = timerState[timerId] || {};
        const isPlaying = playState == constants.PLAY_STATES.PLAYING;

        playState && setPlayState(playState);
        timeStarted && setTimeStarted(timeStarted);
        secondsElapsed && setSecondsElapsed(secondsElapsed);

        if (timeStarted && isPlaying) {
          const accumulatedSecondsElapsed = getAccumulatedSeconds(timeStarted, secondsElapsed);
          const secondsSinceStart = millisecondsToSeconds(Date.now() - timeStarted);

          updateSecondsElapsed(accumulatedSecondsElapsed - secondsSinceStart);
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
        transactTimerState(timerState => {
          timerState[timerId] = { playState, secondsElapsed, timeStarted };

          return timerState;
        });
    },
    [timerId, playState, secondsElapsed, initialized]
  );

  useEffect(
    function handleInterval() {
      let localIntervalTracker;

      if (playState == constants.PLAY_STATES.PLAYING) {
        clearTimerInterval();

        localIntervalTracker = setInterval(handleNextTick, 1000 * 1);

        setIntervalTracker(localIntervalTracker);
      } else {
        clearTimerInterval();
      }

      return () => clearInterval(localIntervalTracker);
    },
    [timer, playState, cacheBust]
  );

  function handleNextTick() {
    const accumulatedSecondsElapsed = getAccumulatedSeconds(timeStarted, secondsElapsed);
    const shouldStop = accumulatedSecondsElapsed >= totalSeconds;

    if (shouldStop) {
      stop();
      setSecondsElapsed(totalSeconds);
    } else {
      setSecondsElapsed(accumulatedSecondsElapsed);
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

  function forward(e, adjustment = 0) {
    const stats = getCurrentPeriodStats(timer.periods, secondsElapsed + adjustment);

    if (!stats) return;

    const willAdvance = stats.remainder > 0;

    if (!willAdvance) {
      forward(null, 1);
    } else {
      const updatedSecondsElapsed = Math.min(
        totalSeconds,
        secondsElapsed + stats.remainder + adjustment
      );

      updateSecondsElapsed(updatedSecondsElapsed);
    }
  }

  function backward(e, adjustment = 0) {
    const stats = getCurrentPeriodStats(timer.periods, secondsElapsed - adjustment);

    if (!stats) return;

    const secondsToRemove = stats.periodSecondsElapsed - adjustment;
    const willReverse = secondsToRemove > 0;

    if (!willReverse) {
      backward(null, 1);
    } else {
      const updatedSecondsElapsed = Math.min(totalSeconds, secondsElapsed - secondsToRemove);

      updateSecondsElapsed(updatedSecondsElapsed);
    }
  }

  function skipForward() {
    const updatedSecondsElapsed = Math.min(
      totalSeconds,
      secondsElapsed + constants.SECONDS_TO_SKIP
    );

    updateSecondsElapsed(updatedSecondsElapsed);
  }

  function skipBackward() {
    const updatedSecondsElapsed = Math.max(0, secondsElapsed - constants.SECONDS_TO_SKIP);

    updateSecondsElapsed(updatedSecondsElapsed);
  }

  function replay() {
    bustCache();
    setSecondsElapsed(0);
  }

  function updateSecondsElapsed(updatedSecondsElapsed) {
    setSecondsElapsed(updatedSecondsElapsed);
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

  return {
    secondsElapsed,
    totalSeconds,
    playState,
    effects: instrumentEffects(effects),
  };
};

function getAccumulatedSeconds(timeStarted, secondsElapsed) {
  const secondsSinceStart = millisecondsToSeconds(Date.now() - timeStarted);
  const accumulatedSecondsElapsed = secondsSinceStart + secondsElapsed;

  return accumulatedSecondsElapsed;
}

function millisecondsToSeconds(millis) {
  return Math.floor(millis / 1000);
}

function transactTimerState(transaction) {
  const timerState = getTimerState();

  const updatedTimerState = transaction(timerState);

  setTimerState(updatedTimerState);
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
