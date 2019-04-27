import React from 'react';
import TimerTopBar from '../timer/timer-top-bar';
import TimerProgressBars from '../timer/timer-progress-bars';
import TimerDescription from '../timer/timer-description';
import TimerList from '../timer/timer-list';
import TimerControls from '../timer/timer-controls';
import TimerProvider from '../contexts/timer-context';

import './timer-play.css';

export default ({ timerId }) => {
  return (
    <TimerProvider timerId={timerId}>
      <div id="timer-play">
        <TimerTopBar />
        <TimerProgressBars />
        <div id="timer-description-container">
          <TimerDescription />
          <TimerList />
        </div>
        <TimerControls />
      </div>
    </TimerProvider>
  );
};
