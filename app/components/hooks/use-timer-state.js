import { useState, useEffect } from 'react';
import calculateTimerTotalSeconds from '../../utilities/calculate-timer-total-seconds';
import constants from '../constants';
import getCurrentPeriodStats from '../../utilities/get-current-period-stats';

export default (timerId, timer, { onSecondsElapsed }) => {
  const [initialized, setInitialized] = useState(false);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [playState, setPlayState] = useState(constants.PLAY_STATES.STOPPED);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [timeStarted, setTimeStarted] = useState(null);
  const [intervalTracker, setIntervalTracker] = useState(null);
  const [cacheBust, setCacheBust] = useState(0);

  useEffect(() => onSecondsElapsed(secondsElapsed), [secondsElapsed]);

  useEffect(() => {
    const totalSeconds = calculateTimerTotalSeconds(timer);

    setTotalSeconds(totalSeconds);

    const timerState = getTimerState();
    const { playState, secondsElapsed } = timerState[timerId] || {};

    playState && setPlayState(playState);
    secondsElapsed && setSecondsElapsed(secondsElapsed);

    setInitialized(true);
  }, [timer]);

  useEffect(() => {
    const shouldUpdate = !!timerId && initialized;

    shouldUpdate &&
      transactTimerState(timerState => {
        timerState[timerId] = { playState, secondsElapsed };

        return timerState;
      });
  }, [timerId, playState, secondsElapsed]);

  useEffect(() => {
    let localIntervalTracker;

    if (playState == constants.PLAY_STATES.PLAYING) {
      clearTimerInterval();

      localIntervalTracker = setInterval(() => {
        const accumulatedSecondsElapsed = getAccumulatedSeconds(timeStarted, secondsElapsed);
        const shouldStop = accumulatedSecondsElapsed >= totalSeconds;

        if (shouldStop) {
          stop();
          setSecondsElapsed(totalSeconds);
        } else {
          setSecondsElapsed(accumulatedSecondsElapsed);
        }
      }, 1000 * 1);

      setIntervalTracker(localIntervalTracker);
    } else {
      clearTimerInterval();
    }

    return () => clearInterval(localIntervalTracker);
  }, [timer, playState, cacheBust]);

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

  return {
    secondsElapsed,
    totalSeconds,
    playState,
    effects: { play, stop, pause, forward, backward, skipForward, skipBackward, replay },
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
