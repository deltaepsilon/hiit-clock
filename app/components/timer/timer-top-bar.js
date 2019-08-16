import React, { useContext } from 'react';
import BackButton from '../top-bar/back-button';
import Title from '../top-bar/title';
import TimerData from '../top-bar/timer-data';
import constants from '../constants';
import { TimerContext } from '../contexts/timer-context';
import ChromecastButton from '../chromecast/chromecast-button';
import MediaSessionButton from '../media-session/media-session-button';

export default function TimerTopBar({ mediaSessionEnabled, onMediaSessionClick }) {
  const { timerId, timer, totalSeconds, userId } = useContext(TimerContext);
  const timerTopBarViewProps = {
    mediaSessionEnabled,
    timerId,
    timerName: timer.name,
    onMediaSessionClick,
    totalSeconds,
    userId,
  };

  return <TimerTopBarView {...timerTopBarViewProps} />;
}

const TimerTopBarView = React.memo(
  ({ mediaSessionEnabled, onMediaSessionClick, timerId, timerName, userId }) => (
    <>
      <BackButton href={`${constants.ROUTES.TIMER.DETAIL}?id=${timerId}&userId=${userId}`} />

      <Title style={{ fontSize: '1rem' }}>{timerName}</Title>

      <TimerData>
        <MediaSessionButton enabled={mediaSessionEnabled} onClick={onMediaSessionClick} />
        <ChromecastButton />
      </TimerData>
    </>
  )
);
