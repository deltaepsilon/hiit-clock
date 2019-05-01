/* globals window */
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import debounce from '../../utilities/debounce';
import { Fab } from '@rmwc/fab';
import PlayCircleOutlineSvg from '../svg/play-circle-outline';

import './timer-actions.css';

export default ({ timerId }) => {
  const [scrollY, setScrollY] = useState(0);
  const fixedActions = scrollY > 250;
  const href = `/timer/play?id=${timerId}`;

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
    </div>
  );
};

function PlayFab({ className }) {
  return <Fab className={className} icon={<PlayCircleOutlineSvg />} label="Start" />;
}
