/* globals window */
import React, { useMemo, useState } from 'react';
import useTimer from '../hooks/use-timer';
import useTimerState from '../hooks/use-timer-state';
import getTimerCycles from '../../utilities/get-timer-cycles';
import addMetadataToCycles from '../../utilities/add-metadata-to-cycles';

export const TimerContext = React.createContext();
export const SecondsContext = React.createContext();

export default ({ timerId, children }) => {
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

  const timerValue = {
    timerId,
    timer: { ...timer, periods },
    cycles,
    totalSeconds,
    playState,
    effects,
  };
  const secondsValue = { secondsElapsed };

  return (
    <TimerContext.Provider value={timerValue}>
      <SecondsContext.Provider value={secondsValue}>{children}</SecondsContext.Provider>
    </TimerContext.Provider>
  );
};

function convertCyclesToPeriodsWithMetadata(cycles, { totalSeconds }) {
  const flatPeriods = cycles.reduce((periods, cycle) => periods.concat(cycle), []);
  const periodsWithMetadata = flatPeriods.map(period => {
    const percentOfTotal = Math.round((100 * period.totalSeconds) / totalSeconds) / 100;

    return { ...period, percentOfTotal };
  });

  return periodsWithMetadata;
}
