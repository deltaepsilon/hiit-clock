import React, { useContext } from 'react';
import BackButton from '../top-bar/back-button';
import TotalTime from '../timer/total-time';
import { TimerContext } from '../contexts/timer-context';

import './timer-top-bar.css';

export default function TimerTopBar() {
  const { timerId, timer, totalSeconds } = useContext(TimerContext);

  return (
    <div id="timer-top-bar">
      <BackButton visible url={`/timer?id=${timerId}`} />
      <h1>{timer.name}</h1>
      <TotalTime totalSeconds={ totalSeconds } />
    </div>
  );
}
