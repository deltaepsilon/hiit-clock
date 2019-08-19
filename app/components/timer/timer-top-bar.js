import React, { useContext, useEffect, useState } from 'react';
import BackButton from '../top-bar/back-button';
import Title from '../top-bar/title';
import TimerData from '../top-bar/timer-data';
import constants from '../constants';
import { TimerContext } from '../contexts/timer-context';
import ChromecastButton from '../chromecast/chromecast-button';
import MediaSessionButton from '../media-session/media-session-button';

export default function TimerTopBar({ mediaSessionEnabled, onMediaSessionClick }) {
  const [showMediaSession, setShowMediaSession] = useState(false);
  const { timerId, timer, totalSeconds, userId } = useContext(TimerContext);
  const timerTopBarViewProps = {
    mediaSessionEnabled,
    onMediaSessionClick,
    showMediaSession,
    timerId,
    timerName: timer.name,
    totalSeconds,
    userId,
  };

  useEffect(() => {
    if ('mediaSession' in navigator) {
      setShowMediaSession(true);
    }
  }, []);

  return <TimerTopBarView {...timerTopBarViewProps} />;
}

const TimerTopBarView = React.memo(
  ({ mediaSessionEnabled, onMediaSessionClick, showMediaSession, timerId, timerName, userId }) => (
    <>
      <BackButton href={`${constants.ROUTES.TIMER.DETAIL}?id=${timerId}&userId=${userId}`} />

      <Title style={{ fontSize: '1rem' }}>{timerName}</Title>

      <TimerData>
        {showMediaSession && (
          <MediaSessionButton enabled={mediaSessionEnabled} onClick={onMediaSessionClick} />
        )}
        <ChromecastButton />
      </TimerData>
    </>
  )
);
