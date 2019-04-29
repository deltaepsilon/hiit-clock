import React, { useContext } from 'react';
import CyclesList from './cycles-list';
import { SecondsContext, TimerContext } from '../contexts/timer-context';

import './timer-progress-details.css';

export default function TimerProgressDetails() {
  const { cycles } = useContext(TimerContext);
  const { cycleStats } = useContext(SecondsContext);

  return (
    <div id="timer-list">
      <CyclesList cycles={cycles} cycleIndexFilter={cycleStats.index} />
    </div>
  );
}
