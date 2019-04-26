import React, { useContext } from 'react';
import CyclesList from './cycles-list';
import { TimerContext } from '../contexts/timer-context';

import './timer-list.css';

export default function TimerList() {
  const { cycles } = useContext(TimerContext);

  return (
    <div id="timer-list">
      <CyclesList cycles={cycles} />
    </div>
  );
}
