import React, { useContext } from 'react';
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
import { SecondsContext, TimerContext } from '../contexts/timer-context';

import './timer-controls.css';

export default function TimerControls() {
  const { timerId, totalSeconds, playState, effects } = useContext(TimerContext);
  const { secondsElapsed } = useContext(SecondsContext);
  const isInFlight = secondsElapsed != 0;
  const isAtMax = secondsElapsed == totalSeconds;
  const isPlaying = playState == constants.PLAY_STATES.PLAYING;
  const isPaused = playState == constants.PLAY_STATES.PAUSED;
  const isStopped = playState == constants.PLAY_STATES.STOPPED;

  return (
    <div id="timer-controls">
      {isPlaying && (
        <>
          <a id="timer-controls-skip-backward" onClick={effects.skipBackward}>
            <Replay10 {...smallButtonProps} />
          </a>
          <a id="timer-controls-backward" onClick={effects.backward}>
            <SkipPrevious {...smallButtonProps} />
          </a>

          <a id="timer-controls-pause" onClick={effects.pause}>
            <PauseCircleFilled {...largeButtonProps} />
          </a>
          <a id="timer-controls-forward" onClick={effects.forward}>
            <SkipNext {...smallButtonProps} />
          </a>
          <a id="timer-controls-skip-forward" onClick={effects.skipForward}>
            <Forward10 {...smallButtonProps} />
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
          <a id="timer-controls-backward" onClick={effects.backward}>
            <SkipPrevious {...smallButtonProps} />
          </a>
          <a id="timer-controls-play" onClick={effects.play} disabled={isAtMax}>
            <PlayCircleFilled {...largeButtonProps} />
          </a>
          <a id="timer-controls-forward" onClick={effects.forward} disabled={isAtMax}>
            <SkipNext {...smallButtonProps} />
          </a>
          <a id="timer-controls-replay" onClick={effects.replay} disabled={!isInFlight}>
            <Replay {...smallButtonProps} />
          </a>
        </>
      )}
    </div>
  );
}

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
