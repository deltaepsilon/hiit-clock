/* globals window */
import React, { useEffect, useMemo, useState } from 'react';
import uuid from 'uuid/v4';
import useTimer from '../hooks/use-timer';
import useTimerState from '../hooks/use-timer-state';
import getTimerCycles from '../../utilities/get-timer-cycles';
import getCurrentCycleStats from '../../utilities/get-current-cycle-stats';
import getCurrentPeriodStats from '../../utilities/get-current-period-stats';
import addMetadataToCycles from '../../utilities/add-metadata-to-cycles';

export const TimerContext = React.createContext();
export const SecondsContext = React.createContext();

export default ({ children, isOwned, timerId, userId }) => {
  const [cycleStats, setCycleStats] = useState({});
  const [periodStats, setPeriodStats] = useState({});
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const timer = useTimer({ timerId, userId });
  const { totalSeconds, playState, effects } = useTimerState(timerId, timer, {
    onSecondsElapsed: seconds => setSecondsElapsed(seconds),
    userId,
  });
  const [cycles, periods] = useMemo(() => {
    const cycles = getTimerCycles(timer);
    const cyclesWithMetadata = addMetadataToCycles(cycles);
    const periodsWithMetadata = convertCyclesToPeriodsWithMetadata(cyclesWithMetadata, {
      totalSeconds,
    });
    const periodsWithIds = isOwned ? periodsWithMetadata : addPeriodIds(periodsWithMetadata);

    return [cyclesWithMetadata, periodsWithIds];
  }, [timer, totalSeconds]);

  useEffect(() => {
    const cycleStats = getCurrentCycleStats(cycles, {
      timer,
      secondsElapsed,
    });
    const periodStats = getCurrentPeriodStats(timer.periods, secondsElapsed);

    cycleStats && setCycleStats(cycleStats);
    periodStats && setPeriodStats(periodStats);
  }, [timer, secondsElapsed]);

  const timerValue = useMemo(
    () => ({
      cycles,
      effects,
      isOwned,
      playState,
      timerId,
      timer: { ...timer, periods },
      totalSeconds,
      userId,
    }),
    [cycles, effects, isOwned, periods, playState, timer, timerId, totalSeconds, userId]
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
  return periods.map(period => ({ ...period, id: uuid() }));
}
