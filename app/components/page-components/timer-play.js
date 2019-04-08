import React from 'react';
import Link from 'next/link';
import useTimer from '../hooks/use-timer';
import getTimerCycles from '../../utilities/get-timer-cycles';
import BackButton from '../top-bar/back-button';
import TotalTime from '../timer/total-time';
import useTimerState from '../hooks/use-timer-state';
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

import './timer-play.css';

export default ({ timerId }) => {
  const timer = useTimer(timerId);
  const cycles = getTimerCycles(timer);
  const { totalSeconds, playState, secondsElapsed, effects } = useTimerState(timerId, timer);

  return (
    <div id="timer-play">
      <TimerTopBar timer={timer} timerId={timerId} totalSeconds={totalSeconds} />
      <TimerBars timer={timer} secondsElapsed={secondsElapsed} />
      <div id="timer-description-container">
        <TimerDescription />
        <TimerList />
      </div>
      <TimerControls
        effects={effects}
        playState={playState}
        isInFlight={secondsElapsed != 0}
        timerId={timerId}
      />
    </div>
  );
};

function TimerTopBar({ timer, timerId, totalSeconds }) {
  return (
    <div id="timer-top-bar">
      <BackButton visible url={`/timer?id=${timerId}`} />
      <h1>{timer.name}</h1>
      <TotalTime totalSeconds={totalSeconds || 0} />
    </div>
  );
}

function TimerBars({ timer, secondsElapsed }) {
  return <div id="timer-bars">{secondsElapsed}</div>;
}

function TimerDescription() {
  return <div id="timer-description">TimerDescription</div>;
}

function TimerList() {
  return <div id="timer-list">TimerList</div>;
}

function TimerControls({ effects, playState, isInFlight, timerId }) {
  const { start, stop, pause, forward, backward, skipForward, skipBackward } = effects;
  const isPlaying = playState == constants.PLAY_STATES.PLAYING;
  const isPaused = playState == constants.PLAY_STATES.PAUSED;
  const isStopped = playState == constants.PLAY_STATES.STOPPED;
  const largeButtonProps = {
    width: 75,
    height: 75,
    fill: constants.COLORS.HIGHLIGHT,
  };
  const smallButtonProps = {
    width: 50,
    height: 50,
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
          <a onClick={effects.play}>
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
