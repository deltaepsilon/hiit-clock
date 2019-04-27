/* globals window */
import React, { useMemo, useState } from 'react';
import useTimer from '../hooks/use-timer';
import useTimerState from '../hooks/use-timer-state';
import getTimerCycles from '../../utilities/get-timer-cycles';
import addMetadataToCycles from '../../utilities/add-metadata-to-cycles';
import addMetadataToPeriods from '../../utilities/add-metadata-to-periods';

export const TimerContext = React.createContext();
export const SecondsContext = React.createContext();

export default ({ timerId, children }) => {
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const timer = useTimer(timerId);
  const cycles = useMemo(() => {
    const cycles = getTimerCycles(timer);
    const cyclesWithMetadata = addMetadataToCycles(cycles);

    return cyclesWithMetadata;
  }, [timer]);
  const periods = useMemo(() => {
    const periodsWithMetadata = addMetadataToPeriods(timer.periods);

    return periodsWithMetadata;
  }, [timer]);
  const { totalSeconds, playState, effects } = useTimerState(timerId, timer, {
    onSecondsElapsed: seconds => setSecondsElapsed(seconds),
  });
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
