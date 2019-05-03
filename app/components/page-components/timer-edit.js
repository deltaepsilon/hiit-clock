import React from 'react';
import TimerProvider from '../contexts/timer-context';

import './timer-edit.css';

export default ({ timerId }) => {
  return (
    <TimerProvider timerId={timerId}>
      <div id="timer-edit">TIMER EDIT</div>
    </TimerProvider>
  );
};
