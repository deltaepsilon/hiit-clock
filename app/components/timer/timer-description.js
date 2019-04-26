import React, { useContext } from 'react';
import { TimerContext } from '../contexts/timer-context';

import './timer-description.css';

export default function TimerDescription() {
  const { timer } = useContext(TimerContext);

  return (
    <div id="timer-description">
      <p>{timer.description}</p>
      <img src="https://www.fillmurray.com/200/300" alt={`${timer.name} image`} />
    </div>
  );
}
