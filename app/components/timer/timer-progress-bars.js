import React, { useContext } from 'react';
import TimerProgress from '../canvas/timer-progress';
import CycleProgress from '../canvas/cycle-progress';
import { SecondsContext, TimerContext } from '../contexts/timer-context';

import './timer-progress-bars.css';

export default function TimerBars() {
  const { timer, cycles } = useContext(TimerContext);
  const { secondsElapsed } = useContext(SecondsContext);

  return (
    <div id="timer-bars">
      <TimerProgress timer={timer} cycles={cycles} secondsElapsed={secondsElapsed} />
      <CycleProgress timer={timer} cycles={cycles} secondsElapsed={secondsElapsed} />
    </div>
  );
}
