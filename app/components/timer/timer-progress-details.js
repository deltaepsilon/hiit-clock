import React, { useCallback, useEffect, useContext, useMemo, useState } from 'react';
import CyclesList from './cycles-list';
import { SecondsContext, TimerContext } from '../contexts/timer-context';
import TotalTime from './total-time';
import constants from '../constants';
import './timer-progress-details.css';

const MODES = ['COUNTDOWN', 'PERIOD', 'CYCLE', 'TIME', 'DESCRIPTION', 'IMAGE'];

export default function TimerProgressDetails() {
  const { cycles, timer, totalSeconds } = useContext(TimerContext);
  const { secondsElapsed, cycleStats, periodStats } = useContext(SecondsContext);
  const { cycleSecondsElapsed, cycleTotalSeconds } = cycleStats;
  const { period } = periodStats;
  const [modeIndex, setModeIndex] = useState(0);
  const cycleMode = useCallback(() => setModeIndex(i => ++i % MODES.length));
  const { isCountdown, isPeriod, isCycle, isTime, isDescription, isImage, mode } = useMemo(() => {
    const mode = MODES[modeIndex];

    return {
      isCountdown: mode == MODES[0],
      isPeriod: mode == MODES[1],
      isCycle: mode == MODES[2],
      isTime: mode == MODES[3],
      isDescription: mode == MODES[4],
      isImage: mode == MODES[5],
      mode,
    };
  }, [modeIndex]);

  useEffect(() => {
    isImage && (!period.file || !period.file.downloadURL) && cycleMode();
    isDescription && !timer.description && cycleMode();
  }, [cycleMode, isDescription, isImage, period, timer]);

  const shouldRenderDetails = periodStats.period;
  const detailsViewProps = {
    cycleMode,
    isCountdown,
    isPeriod,
    isCycle,
    isTime,
    isDescription,
    isImage,
    periodStats,
    cycleSecondsElapsed,
    cycleTotalSeconds,
    secondsElapsed,
    totalSeconds,
    cycles,
    cycleStats,
    timer,
    mode,
  };

  return shouldRenderDetails ? <DetailsView {...detailsViewProps} /> : null;
}

const DetailsView = React.memo(
  ({
    cycleMode,
    isCountdown,
    isPeriod,
    isCycle,
    isTime,
    isDescription,
    isImage,
    periodStats,
    cycleSecondsElapsed,
    cycleTotalSeconds,
    secondsElapsed,
    totalSeconds,
    cycles,
    cycleStats,
    timer,
    mode,
  }) => {
    const { index: periodIndex, period, periodSecondsElapsed, periodTotalSeconds } = periodStats;

    return (
      <div id="timer-list">
        <div className="seconds-row" onClick={cycleMode}>
          {isCountdown && (
            <CountdownView
              period={period}
              periodSecondsElapsed={periodSecondsElapsed}
              periodTotalSeconds={periodTotalSeconds}
            />
          )}
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
          {isImage && period.file && period.file.downloadURL && (
            <div>
              <img src={period.file.downloadURL} alt="period image" />
            </div>
          )}
        </div>
        <div id="cycles-list">
          <CyclesList
            cycles={cycles}
            cycleIndexFilter={cycle => {
              const cycleIndex = cycle.index;
              const isCurrentCycle = cycleStats.index == cycleIndex;
              const isNextCycle = cycleStats.index + 1 == cycleIndex;
              const currentCyclePeriods = cycles[cycleIndex];
              const currentPeriodsRemaining = currentCyclePeriods.length - 1 - periodIndex;

              return isCurrentCycle || (isNextCycle && currentPeriodsRemaining < 2);
            }}
            periodFilter={(period, cycles) => {
              const periodDiff = period.periodIndex - periodIndex;
              const isCurrentOrFuturePeriod = periodDiff >= 0;
              const isNotFarFuture = periodDiff < 3;

              return isCurrentOrFuturePeriod && isNotFarFuture;
            }}
          />
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    const secondsEqual =
      prevProps.secondsElapsed == nextProps.secondsElapsed &&
      prevProps.cycleSecondsElapsed == nextProps.cycleSecondsElapsed;
    const modeEqual = prevProps.mode == nextProps.mode;
    const periodEqual = prevProps.period == nextProps.period;
    const cycleStatsEqual = prevProps.cycleStats == nextProps.cycleStats;

    return secondsEqual && modeEqual && periodEqual && cycleStatsEqual;
  }
);

function CountdownView({ period, periodSecondsElapsed, periodTotalSeconds }) {
  const secondsRemaining = periodTotalSeconds - periodSecondsElapsed;
  const periodNameByType =
    period.type == constants.PERIOD_TYPES.REST ? constants.TEXT.REST : constants.TEXT.WORK;
  const name = period.name || periodNameByType;

  return (
    <>
      <div className="big-time">
        <TotalTime totalSeconds={secondsRemaining} />
      </div>
      <div className="big-name">{name}</div>
    </>
  );
}

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
