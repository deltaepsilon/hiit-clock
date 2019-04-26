import React, { useContext } from 'react';
import CycleProgress from '../canvas/cycle-progress';
import { SecondsContext, TimerContext } from '../contexts/timer-context';

import './timer-bars.css';

export default function TimerBars() {
  const { timer, cycles } = useContext(TimerContext);
  const { secondsElapsed } = useContext(SecondsContext);

  return (
    <div id="timer-bars">
      <CycleProgress timer={timer} cycles={cycles} secondsElapsed={secondsElapsed} />
    </div>
  );
}
