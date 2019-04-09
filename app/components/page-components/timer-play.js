import React from 'react';
import Link from 'next/link';
import useTimer from '../hooks/use-timer';
import getTimerCycles from '../../utilities/get-timer-cycles';
import BackButton from '../top-bar/back-button';
import TotalTime from '../timer/total-time';
import TimerControls from '../timer/timer-controls';
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
        isAtMax={secondsElapsed == totalSeconds}
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