/* globals window */
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Fab } from '@rmwc/fab';
import { IconButton } from '@rmwc/icon-button';
import debounce from '../../utilities/debounce';
import { PlayCircleOutline, Share } from '../svg';
import ShareUrl from '../share-url/share-url';
import constants from '../constants';

import './timer-actions.css';

export default ({ timerId, uid }) => {
  const [scrollY, setScrollY] = useState(0);
  const fixedActions = scrollY > 250;
  const playHref = `${location.origin}/timer/play?id=${timerId}&uid=${uid}`;

  useEffect(() => {
    const handleScroll = debounce(() => {
      setScrollY(window.scrollY);
    }, 50);

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  });

  return (
    <div id="timer-actions" fixed-actions={String(fixedActions)}>
      <Link href={playHref}>
        <a href={playHref}>
          <PlayFab />
          {fixedActions && <PlayFab className="fixed-fab" />}
        </a>
      </Link>
      <ShareButton uid={uid} />
    </div>
  );
};

function PlayFab({ className }) {
  return <Fab className={className} icon={<PlayCircleOutline />} label="Start" />;
}

function ShareButton({ uid }) {
  const shareHref = uid ? `${location.origin}${constants.ROUTES.TIMER.SHARED}?uid=${uid}` : '';

  return shareHref ? (
    <ShareUrl title="HiiT Clock Timer" href={shareHref}>
      <IconButton className="share-button" icon={<Share />} />
    </ShareUrl>
  ) : null;
}
