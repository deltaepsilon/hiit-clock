import React, { useContext } from 'react';
import Link from 'next/link';
import { Fab } from '@rmwc/fab';
import { AuthenticationContext } from '../contexts/authentication-context';
import { Edit, FileCopyOutline } from '../svg';
import useTimer from '../hooks/use-timer';
import BackButton from '../top-bar/back-button';
import Title from '../top-bar/title';
import TotalTime from '../timer/total-time';
import getTimerCycles from '../../utilities/get-timer-cycles';
import CyclesList from '../timer/cycles-list';
import TimerActions from '../timer/timer-actions';
import TimerSchema from '../timer/timer-schema';
import constants from '../constants';

import './timer-details.css';

export default ({ timerId, userId }) => {
  const { currentUser } = useContext(AuthenticationContext);

  const timer = useTimer({ timerId, userId });
  const cycles = getTimerCycles(timer);
  const isOwned = currentUser && currentUser.uid == userId;
  const fabHref = `${constants.ROUTES.TIMER.EDIT}?id=${timerId}&userId=${userId}&isOwned=${isOwned}`;
  const fabIcon = isOwned ? <Edit /> : <FileCopyOutline />;
  const imageSrc = timer.file && timer.file.downloadURL;

  return (
    <>
      <TimerSchema timer={timer} />
      <BackButton href={constants.ROUTES.DASHBOARD} />

      <div id="timer-details">
        <Title>{timer.name}</Title>

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

        {imageSrc && <img src={imageSrc} alt={`${timer.name} descriptive image`} />}

        <TimerActions timerId={timerId} userId={userId} />

        <Link href={fabHref}>
          <Fab className="edit" tag="a" href={fabHref} icon={fabIcon} />
        </Link>

        <CyclesList cycles={cycles} />
      </div>
    </>
  );
};
