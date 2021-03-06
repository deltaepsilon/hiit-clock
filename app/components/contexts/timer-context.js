/* globals window */
import React, { useEffect, useMemo, useState } from 'react';
import uuid from 'uuid/v4';
import getTimerCycles from '../../utilities/get-timer-cycles';
import getCurrentCycleStats from '../../utilities/get-current-cycle-stats';
import getCurrentPeriodStats from '../../utilities/get-current-period-stats';
import addMetadataToCycles from '../../utilities/add-metadata-to-cycles';

export const TimerContext = React.createContext();
export const SecondsContext = React.createContext();

export default ({ children, secondsElapsed, timer, timerId, timerState, userId }) => {
  const { effects, playState, totalSeconds } = timerState;
  const [cycleStats, setCycleStats] = useState({});
  const [periodStats, setPeriodStats] = useState({});
  const [cycles, periods] = useMemo(() => {
    const cycles = getTimerCycles(timer);
    const cyclesWithMetadata = addMetadataToCycles(cycles);
    const periodsWithMetadata = convertCyclesToPeriodsWithMetadata(cyclesWithMetadata, {
      totalSeconds,
    });
    const periodsWithIds = addPeriodIds(periodsWithMetadata);

    return [cyclesWithMetadata, periodsWithIds];
  }, [timer, totalSeconds]);

  useEffect(() => {
    let cycleStats = getCurrentCycleStats(cycles, {
      timer,
      secondsElapsed,
    });
    let periodStats = getCurrentPeriodStats(timer.periods, secondsElapsed);
    const isEndOfPeriod = periodStats && periodStats.remainder == 0;

    if (isEndOfPeriod) {
      const nextPeriodStats = getCurrentPeriodStats(timer.periods, secondsElapsed + 1);

      if (nextPeriodStats) {
        periodStats = nextPeriodStats;
        cycleStats = getCurrentCycleStats(cycles, {
          timer,
          secondsElapsed: secondsElapsed + 1,
        });

        periodStats.periodSecondsElapsed -= 1;
        periodStats.remainder += 1;
        periodStats.secondsElapsed -= 1;

        cycleStats.cycleSecondsElapsed -= 1;
        cycleStats.remainder += 1;
        cycleStats.secondsElapsed -= 1;
      }
    }

    cycleStats && setCycleStats(cycleStats);
    periodStats && setPeriodStats(periodStats);
  }, [timer, secondsElapsed]);

  const timerValue = useMemo(
    () => ({
      cycles,
      effects,
      playState,
      timerId,
      timer: { ...timer, periods },
      totalSeconds,
      userId,
    }),
    [cycles, effects, periods, playState, timer, timerId, totalSeconds, userId]
  );
  const secondsValue = useMemo(() => ({ secondsElapsed, cycleStats, periodStats }), [
    periodStats,
    cycleStats,
    secondsElapsed,
  ]);

  return (
    <TimerContext.Provider value={timerValue}>
      <SecondsContext.Provider value={secondsValue}>{children}</SecondsContext.Provider>
    </TimerContext.Provider>
  );
};

function convertCyclesToPeriodsWithMetadata(cycles, { totalSeconds }) {
  const flatPeriods = cycles.reduce((periods, cycle) => periods.concat(cycle), []);
  const periodsWithMetadata = flatPeriods.map(period => {
    const percentOfTotal = Math.round((10000 * period.totalSeconds) / totalSeconds) / 10000;

    return { ...period, percentOfTotal };
  });

  return periodsWithMetadata;
}

function addPeriodIds(periods) {
  return periods.map(period => ({ id: uuid(), ...period }));
}
