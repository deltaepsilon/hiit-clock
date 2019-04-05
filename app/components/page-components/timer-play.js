import React from 'react';
import useTimer from '../hooks/use-timer';
import getTimerCycles from '../../utilities/get-timer-cycles';

export default ({ timerId }) => {
  const timer = useTimer(timerId);
  const cycles = getTimerCycles(timer);

  console.log({ timer, cycles });

  return (
    <>
      <h1>Timer Play</h1>
    </>
  );
};
