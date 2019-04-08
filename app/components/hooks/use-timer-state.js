import { useState, useEffect } from 'react';
import calculateTimerTotalSeconds from '../../utilities/calculate-timer-total-seconds';
import constants from '../constants';

export default (timerId, timer) => {
  const [initialized, setInitialized] = useState(false);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [playState, setPlayState] = useState(constants.PLAY_STATES.STOPPED);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [timeStarted, setTimeStarted] = useState(null);
  const [intervalTracker, setIntervalTracker] = useState(null);
  const [cacheBust, setCacheBust] = useState(0);

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

        setSecondsElapsed(accumulatedSecondsElapsed);
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

  function forward() {
    console.log('forward');
  }

  function backward() {
    console.log('backward');
  }

  function skipForward() {
    const updatedSecondsElapsed = Math.min(
      totalSeconds,
      secondsElapsed + constants.SECONDS_TO_SKIP
    );

    setSecondsElapsed(updatedSecondsElapsed);
    setTimeStarted(Date.now());
    bustCache();
  }

  function skipBackward() {
    const updatedSecondsElapsed = Math.max(0, secondsElapsed - constants.SECONDS_TO_SKIP);

    setSecondsElapsed(updatedSecondsElapsed);
    setTimeStarted(Date.now());
    bustCache();
  }

  function replay() {
    bustCache();
    setSecondsElapsed(0);
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
    totalSeconds,
    playState,
    secondsElapsed,
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
