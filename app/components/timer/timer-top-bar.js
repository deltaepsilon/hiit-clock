import React, { useContext } from 'react';
import BackButton from '../top-bar/back-button';
import TotalTime from '../timer/total-time';
import constants from '../constants';
import { TimerContext } from '../contexts/timer-context';

import './timer-top-bar.css';

export default function TimerTopBar() {
  const { timerId, timer, totalSeconds } = useContext(TimerContext);
  const timerTopBarViewProps = {
    timerId,
    timerName: timer.name,
    totalSeconds,
  };

  return <TimerTopBarView {...timerTopBarViewProps} />;
}

const TimerTopBarView = React.memo(({ timerId, timerName, totalSeconds }) => (
  <div id="timer-top-bar">
    <BackButton visible url={`${constants.ROUTES.TIMER.DETAIL}?id=${timerId}`} />
    <h1>{timerName}</h1>
    <TotalTime totalSeconds={totalSeconds} />
  </div>
));
