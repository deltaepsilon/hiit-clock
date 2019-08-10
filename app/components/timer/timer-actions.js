/* globals window */
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import debounce from '../../utilities/debounce';
import { Fab } from '@rmwc/fab';
import { IconButton } from '@rmwc/icon-button';
import { PlayCircleOutline, Share } from '../svg';
import constants from '../constants';

import './timer-actions.css';

export default ({ timerId, userId }) => {
  const [scrollY, setScrollY] = useState(0);
  const fixedActions = scrollY > 250;
  const href = `${constants.ROUTES.TIMER.PLAY}?id=${timerId}`;

  useEffect(() => {
    const handleScroll = debounce(() => {
      setScrollY(window.scrollY);
    }, 50);

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  });

  return (
    <div id="timer-actions" fixed-actions={String(fixedActions)}>
      <Link href={href}>
        <a href={href}>
          <PlayFab />
          {fixedActions && <PlayFab className="fixed-fab" />}
        </a>
      </Link>
      <ShareButton timerId={timerId} userId={userId} />
    </div>
  );
};

function PlayFab({ className }) {
  return <Fab className={className} icon={<PlayCircleOutline />} label="Start" />;
}

function ShareButton({ timerId, userId }) {
  const href = `/timer/chromecast?id=${timerId}&userId=${userId}`;

  return userId ? <IconButton className="share-button" icon={<Share />} /> : null;
}
