import React, { useContext } from 'react';
import BackButton from '../top-bar/back-button';
import Title from '../top-bar/title';
import TimerData from '../top-bar/timer-data';
import TotalTime from '../timer/total-time';
import constants from '../constants';
import { TimerContext } from '../contexts/timer-context';

export default function TimerTopBar() {
  const { timerId, timer, totalSeconds, userId } = useContext(TimerContext);
  const timerTopBarViewProps = {
    timerId,
    timerName: timer.name,
    totalSeconds,
    userId,
  };

  return <TimerTopBarView {...timerTopBarViewProps} />;
}

const TimerTopBarView = React.memo(({ timerId, timerName, totalSeconds, userId }) => (
  <>
    <BackButton href={`${constants.ROUTES.TIMER.DETAIL}?id=${timerId}&userId=${userId}`} />

    <Title>{timerName}</Title>

    <TimerData>
      <TotalTime totalSeconds={totalSeconds} />
    </TimerData>
  </>
));
