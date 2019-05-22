import React from 'react';
import Link from 'next/link';
import { Fab } from '@rmwc/fab';
import { Edit } from '../svg';
import useTimer from '../hooks/use-timer';
import TotalTime from '../timer/total-time';
import getTimerCycles from '../../utilities/get-timer-cycles';
import CyclesList from '../timer/cycles-list';
import TimerActions from '../timer/timer-actions';
import constants from '../constants';

import './timer-details.css';

export default ({ timerId, userId }) => {
  const timer = useTimer({ timerId, userId });
  const cycles = getTimerCycles(timer);
  const editHref = `${constants.ROUTES.TIMER.EDIT}?id=${timerId}&userId=${userId}`;

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

      <Link href={editHref}>
        <Fab className="edit" tag="a" href={editHref} icon={<Edit />} />
      </Link>

      <CyclesList cycles={cycles} />
    </div>
  );
};
