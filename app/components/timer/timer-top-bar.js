import React, { useContext, useEffect, useState } from 'react';
import uuid from 'uuid/v4';
import { IconButton } from '@rmwc/icon-button';
import { Share } from '../svg';
import BackButton from '../top-bar/back-button';
import Title from '../top-bar/title';
import TimerData from '../top-bar/timer-data';
import { TimerContext } from '../contexts/timer-context';
import ChromecastButton from '../chromecast/chromecast-button';
import MediaSessionButton from '../media-session/media-session-button';
import constants from '../constants';
import ShareUrl from '../share-url/share-url';

export default function TimerTopBar({ mediaSessionEnabled, onMediaSessionClick }) {
  const [showMediaSession, setShowMediaSession] = useState(false);
  const { timerId, timer, totalSeconds, userId } = useContext(TimerContext);
  const shareHref = `${location.origin}${
    constants.ROUTES.TIMER.SHARED
  }?id=${timerId}&uid=${userId}&shareId=${uuid()}`;
  const timerTopBarViewProps = {
    mediaSessionEnabled,
    onMediaSessionClick,
    showMediaSession,
    shareHref,
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
  ({
    mediaSessionEnabled,
    onMediaSessionClick,
    showMediaSession,
    shareHref,
    timerId,
    timerName,
    userId,
  }) => (
    <>
      <BackButton href={`${constants.ROUTES.TIMER.DETAIL}?id=${timerId}&userId=${userId}`} />

      <Title style={{ fontSize: '1rem' }}>{timerName}</Title>

      <TimerData>
        {showMediaSession && (
          <MediaSessionButton enabled={mediaSessionEnabled} onClick={onMediaSessionClick} />
        )}
        <ShareButton href={shareHref} />
        <ChromecastButton />
      </TimerData>
    </>
  )
);

function ShareButton({ href }) {
  return href ? (
    <ShareUrl title="HiiT Clock Timer" href={href}>
      <IconButton className="share-button" icon={<Share />} />
    </ShareUrl>
  ) : null;
}
