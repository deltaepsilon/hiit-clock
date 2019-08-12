import React, { useState } from 'react';
import useTimer from '../hooks/use-timer';
import useTimerState from '../hooks/use-timer-state';
import TimerTopBar from '../timer/timer-top-bar';
import TimerProgressBars from '../timer/timer-progress-bars';
import TimerProgressDetails from '../timer/timer-progress-details';
import TimerControls from '../timer/timer-controls';
import TimerSound from '../timer/timer-sound';
import TimerFlash from '../timer/timer-flash';
import TimerProvider from '../contexts/timer-context';

import './timer-play.css';

export default ({ timerId, userId }) => {
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const timer = useTimer({ timerId, userId });
  const timerState = useTimerState(timerId, timer, {
    onSecondsElapsed: seconds => setSecondsElapsed(seconds),
  });

  return (
    <TimerProvider
      secondsElapsed={secondsElapsed}
      timer={timer}
      timerId={timerId}
      timerState={timerState}
      userId={userId}
    >
      <div id="timer-play">
        <TimerTopBar />
        <div id="timer-details-container">
          <TimerProgressBars />
          <TimerProgressDetails />
        </div>
        <TimerControls />
        <TimerSound />
        <TimerFlash />
      </div>
    </TimerProvider>
  );
};
