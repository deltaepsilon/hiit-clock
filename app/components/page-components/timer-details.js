import React from 'react';
import useTimer from '../hooks/use-timer';
import TotalTime from '../timer/total-time';
import getTimerCycles from '../../utilities/get-timer-cycles';
import CyclesList from '../timer/cycles-list';
import TimerActions from '../timer/timer-actions';
import { AuthenticationContext } from '../contexts/authentication-context';

import './timer-details.css';

export default ({ timerId, userId }) => {
  const timer = useTimer({ timerId, userId });
  const cycles = getTimerCycles(timer);

  return (
    <div id="timer-details">
      <h1>{timer.name}</h1>

      <ul className="timer-details-list">
        <li>
          <TotalTime periods={timer.periods} />
          <span>Total</span>
        </li>
        <li>
          <span>{cycles.length}</span>
          <span>Cycles</span>
        </li>
      </ul>

      <p>{timer.description}</p>

      <TimerActions timerId={timerId} />

      <CyclesList cycles={cycles} />
    </div>
  );
};
