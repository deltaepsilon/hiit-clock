/* globals window */
import React, { useState, useEffect } from 'react';
import debounce from '../../utilities/debounce';
import { Fab } from '@rmwc/fab';
import PlayCircleOutlineSvg from '../svg/play-circle-outline';

import './timer-actions.css';

export default ({ timerId }) => {
  const [scrollY, setScrollY] = useState(0);
  const fixedActions = scrollY > 250;

  useEffect(() => {
    const handleScroll = debounce(() => {
      setScrollY(window.scrollY);
    }, 50);

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  });

  return (
    <div id="timer-actions" fixed-actions={String(fixedActions)}>
      <a href={`/timer/play?id=${timerId}`}>
        <PlayFab />
        {fixedActions && <PlayFab className="fixed-fab" />}
      </a>
    </div>
  );
};

function PlayFab({ className }) {
  return <Fab className={className} icon={<PlayCircleOutlineSvg />} label="Start" />;
}
