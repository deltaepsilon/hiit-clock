import React, { useContext } from 'react';
import CyclesList from './cycles-list';
import { SecondsContext, TimerContext } from '../contexts/timer-context';
import TotalTime from './total-time';

import './timer-progress-details.css';

export default function TimerProgressDetails() {
  const { cycles } = useContext(TimerContext);
  const { secondsElapsed, cycleStats, periodStats } = useContext(SecondsContext);
  const { cycleSecondsElapsed, cycleTotalSeconds } = cycleStats;
  const { periodSecondsElapsed, periodTotalSeconds } = periodStats;
  const renderDetails = periodStats.period;

  return renderDetails ? (
    <div id="timer-list">
      <div className="seconds-row">
        <div id="period-time">
          <TotalTime totalSeconds={periodSecondsElapsed} />
        </div>
        <div id="time-details">
          <TotalTime totalSeconds={cycleSecondsElapsed} />
        </div>
      </div>
      <div>
        <CyclesList cycles={cycles} cycleIndexFilter={cycleStats.index} />
      </div>
    </div>
  ) : null;
}
