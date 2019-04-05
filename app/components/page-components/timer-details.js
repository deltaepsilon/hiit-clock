import React from 'react';
import useTimer from '../hooks/use-timer';
import TotalTime from '../timer/total-time';
import getTimerCycles from '../../utilities/get-timer-cycles';

import './timer-details.css';

export default ({ timerId }) => {
  const timer = useTimer(timerId);
  const cycles = getTimerCycles(timer);

  return (
    <div id="timer-details">
      <h1>{timer.name}</h1>
      <ul>
        <li>
          Time: <TotalTime timer={timer} />
        </li>
        <li>Periods: {timer.periods.length}</li>
        <li>Cycles: {cycles.length}</li>
      </ul>
    </div>
  );
};
