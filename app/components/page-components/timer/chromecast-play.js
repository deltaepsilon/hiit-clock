import React from 'react';
import useRtdbTimer from '../../hooks/use-rtdb-timer';
import TimerProgressBars from '../../timer/timer-progress-bars';
import TimerProgressDetails from '../../timer/timer-progress-details';
import TimerSound from '../../timer/timer-sound';
import TimerFlash from '../../timer/timer-flash';
import TimerProvider from '../../contexts/timer-context';

import './timer-play.css';

export default ({ shareId, uid }) => {
  const { timer, secondsElapsed, timerState } = useRtdbTimer({
    shareId,
    uid,
  });
  const isLoaded = timer.periods.length;

  return isLoaded ? (
    <TimerProvider secondsElapsed={secondsElapsed} timer={timer} timerState={timerState}>
      <div id="timer-play">
        <div id="timer-details-container">
          <TimerProgressBars />
          <TimerProgressDetails />
        </div>
        <TimerSound />
        <TimerFlash />
      </div>
    </TimerProvider>
  ) : (
    <EmptyTimerState />
  );
};

function EmptyTimerState() {
  return (
    <div id="empty-timer-state">
      <h1>Timer not loaded...</h1>
      <p>Try reloading the app from your casting device.</p>
      <p>Dragging down from the phone app usually works 😉</p>
    </div>
  );
}
