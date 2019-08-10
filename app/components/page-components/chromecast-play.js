import React from 'react';
import useRtdbTimer from '../hooks/use-rtdb-timer';
import TimerTopBar from '../timer/timer-top-bar';
import TimerProgressBars from '../timer/timer-progress-bars';
import TimerProgressDetails from '../timer/timer-progress-details';
import TimerControls from '../timer/timer-controls';
import TimerSound from '../timer/timer-sound';
import TimerFlash from '../timer/timer-flash';
import TimerProvider from '../contexts/timer-context';

import './timer-play.css';

export default ({ timerId, userId }) => {
  const timer = useRtdbTimer({ timerId, userId });

  return (
    <TimerProvider timer={timer} timerId={timerId} userId={userId}>
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
