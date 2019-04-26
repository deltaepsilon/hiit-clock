import React from 'react';
import Link from 'next/link';
import {
  SkipPrevious,
  SkipNext,
  Replay10,
  Replay,
  Forward10,
  PlayCircleFilled,
  PauseCircleFilled,
  Stop,
} from '../svg';
import constants from '../constants';

import './timer-controls.css';

export default function TimerControls({ effects, playState, isInFlight, isAtMax, timerId }) {
  const isPlaying = playState == constants.PLAY_STATES.PLAYING;
  const isPaused = playState == constants.PLAY_STATES.PAUSED;
  const isStopped = playState == constants.PLAY_STATES.STOPPED;
  const largeButtonProps = {
    width: 50,
    height: 50,
    fill: constants.COLORS.HIGHLIGHT,
  };
  const smallButtonProps = {
    width: 30,
    height: 30,
    fill: constants.COLORS.BUTTON_ON_WHITE,
  };

  return (
    <div id="timer-controls">
      {isPlaying && (
        <>
          <a onClick={effects.backward}>
            <SkipPrevious {...smallButtonProps} />
          </a>
          <a onClick={effects.skipBackward}>
            <Replay10 {...smallButtonProps} />
          </a>
          <a onClick={effects.pause}>
            <PauseCircleFilled {...largeButtonProps} />
          </a>
          <a onClick={effects.skipForward}>
            <Forward10 {...smallButtonProps} />
          </a>
          <a onClick={effects.forward}>
            <SkipNext {...smallButtonProps} />
          </a>
        </>
      )}
      {(isPaused || isStopped) && (
        <>
          <Link href={`/timer?id=${timerId}`}>
            <span onClick={effects.stop} disabled={!isInFlight}>
              <Stop {...smallButtonProps} />
            </span>
          </Link>
          <a onClick={effects.play} disabled={isAtMax}>
            <PlayCircleFilled {...largeButtonProps} />
          </a>
          <a onClick={effects.replay} disabled={!isInFlight}>
            <Replay {...smallButtonProps} />
          </a>
        </>
      )}
    </div>
  );
}
