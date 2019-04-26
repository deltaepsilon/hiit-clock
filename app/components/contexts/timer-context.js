/* globals window */
import React, { useMemo, useState } from 'react';
import useTimer from '../hooks/use-timer';
import useTimerState from '../hooks/use-timer-state';
import getTimerCycles from '../../utilities/get-timer-cycles';

export const TimerContext = React.createContext();
export const SecondsContext = React.createContext();

export default ({ timerId, children }) => {
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const timer = useTimer(timerId);
  const cycles = useMemo(() => getTimerCycles(timer), [timer]);
  const { totalSeconds, playState, effects } = useTimerState(timerId, {
    onSecondsElapsed: seconds => setSecondsElapsed(seconds),
  });
  const timerValue = { timerId, timer, cycles, totalSeconds, playState, effects };
  const secondsValue = { secondsElapsed };

  return (
    <TimerContext.Provider value={timerValue}>
      <SecondsContext.Provider value={secondsValue}>{children}</SecondsContext.Provider>
    </TimerContext.Provider>
  );
};
