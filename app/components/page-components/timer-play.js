import React from 'react';
import TimerTopBar from '../timer/timer-top-bar';
import TimerProgressBars from '../timer/timer-progress-bars';
import TimerDescription from '../timer/timer-description';
import TimerProgressDetails from '../timer/timer-progress-details';
import TimerControls from '../timer/timer-controls';
import TimerProvider from '../contexts/timer-context';

import './timer-play.css';

export default ({ timerId }) => {
  return (
    <TimerProvider timerId={timerId}>
      <div id="timer-play">
        <TimerTopBar />
        <TimerProgressBars />
        <div id="timer-details-container">
          <TimerProgressDetails />
        </div>
        <TimerControls />
      </div>
    </TimerProvider>
  );
};
