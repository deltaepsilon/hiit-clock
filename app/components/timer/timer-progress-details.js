import React, { useCallback, useContext, useMemo, useState } from 'react';
import CyclesList from './cycles-list';
import { SecondsContext, TimerContext } from '../contexts/timer-context';
import TotalTime from './total-time';

import './timer-progress-details.css';

const MODES = ['PERIOD', 'CYCLE', 'TIME', 'DESCRIPTION'];

export default function TimerProgressDetails() {
  const { cycles, timer, totalSeconds } = useContext(TimerContext);
  const { secondsElapsed, cycleStats, periodStats } = useContext(SecondsContext);
  const { cycleSecondsElapsed, cycleTotalSeconds } = cycleStats;
  const { periodSecondsElapsed, periodTotalSeconds } = periodStats;

  const [modeIndex, setModeIndex] = useState(0);
  const cycleMode = useCallback(() => setModeIndex(i => ++i % MODES.length));
  const { isPeriod, isCycle, isTime, isDescription } = useMemo(() => {
    const mode = MODES[modeIndex];

    return {
      isPeriod: mode == MODES[0],
      isCycle: mode == MODES[1],
      isTime: mode == MODES[2],
      isDescription: mode == MODES[3],
    };
  }, [modeIndex]);

  const shouldRenderDetails = periodStats.period;
  const detailsViewProps = {
    cycleMode,
    isPeriod,
    isCycle,
    isTime,
    isDescription,
    periodSecondsElapsed,
    periodTotalSeconds,
    cycleSecondsElapsed,
    cycleTotalSeconds,
    secondsElapsed,
    totalSeconds,
    cycles,
    cycleStats,
    timer,
  };

  return shouldRenderDetails ? <DetailsView {...detailsViewProps} /> : null;
}

const DetailsView = React.memo(
  ({
    cycleMode,
    isPeriod,
    isCycle,
    isTime,
    isDescription,
    periodSecondsElapsed,
    periodTotalSeconds,
    cycleSecondsElapsed,
    cycleTotalSeconds,
    secondsElapsed,
    totalSeconds,
    cycles,
    cycleStats,
    timer,
  }) => (
    <div id="timer-list">
      <div className="seconds-row" onClick={cycleMode}>
        {isPeriod && (
          <PeriodView
            periodSecondsElapsed={periodSecondsElapsed}
            periodTotalSeconds={periodTotalSeconds}
          />
        )}
        {isCycle && (
          <CycleView
            cycleSecondsElapsed={cycleSecondsElapsed}
            cycleTotalSeconds={cycleTotalSeconds}
          />
        )}
        {isTime && <TimeView secondsElapsed={secondsElapsed} totalSeconds={totalSeconds} />}
        {isDescription && <p>{timer.description}</p>}
      </div>
      <div>
        <CyclesList cycles={cycles} cycleIndexFilter={cycleStats.index} />
      </div>
    </div>
  ),
  (prevProps, nextProps) => prevProps.secondsElapsed == nextProps.secondsElapsed
);

function PeriodView({ periodSecondsElapsed, periodTotalSeconds }) {
  return (
    <>
      <div className="big-time">
        <TotalTime totalSeconds={periodSecondsElapsed} />
      </div>
      <div>
        <aside>Period</aside>
        <span className="small-time">
          <TotalTime totalSeconds={periodTotalSeconds} />
        </span>
      </div>
    </>
  );
}

function CycleView({ cycleSecondsElapsed, cycleTotalSeconds }) {
  return (
    <>
      <div className="big-time">
        <TotalTime totalSeconds={cycleSecondsElapsed} />
      </div>
      <div>
        <aside>Cycle</aside>
        <span className="small-time">
          <TotalTime totalSeconds={cycleTotalSeconds} />
        </span>
      </div>
    </>
  );
}

function TimeView({ secondsElapsed, totalSeconds }) {
  return (
    <>
      <div className="big-time">
        <TotalTime totalSeconds={secondsElapsed} />
      </div>
      <div>
        <aside>Total</aside>
        <span className="small-time">
          <TotalTime totalSeconds={totalSeconds} />
        </span>
      </div>
    </>
  );
}
