/* globals window */
import React, { useEffect, useMemo, useState } from 'react';
import useTimer from '../hooks/use-timer';
import useTimerState from '../hooks/use-timer-state';
import getTimerCycles from '../../utilities/get-timer-cycles';
import getCurrentCycleStats from '../../utilities/get-current-cycle-stats';
import getCurrentPeriodStats from '../../utilities/get-current-period-stats';
import addMetadataToCycles from '../../utilities/add-metadata-to-cycles';

export const TimerContext = React.createContext();
export const SecondsContext = React.createContext();

export default ({ timerId, children }) => {
  const [cycleStats, setCycleStats] = useState({});
  const [periodStats, setPeriodStats] = useState({});
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const timer = useTimer(timerId);
  const { totalSeconds, playState, effects } = useTimerState(timerId, timer, {
    onSecondsElapsed: seconds => setSecondsElapsed(seconds),
  });
  const [cycles, periods] = useMemo(() => {
    const cycles = getTimerCycles(timer);
    const cyclesWithMetadata = addMetadataToCycles(cycles);
    const periodsWithMetadata = convertCyclesToPeriodsWithMetadata(cyclesWithMetadata, {
      totalSeconds,
    });

    return [cyclesWithMetadata, periodsWithMetadata];
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

  const timerValue = {
    timerId,
    timer: { ...timer, periods },
    cycles,
    totalSeconds,
    playState,
    effects,
  };
  const secondsValue = { secondsElapsed, cycleStats, periodStats };

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
