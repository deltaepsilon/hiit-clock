import React from 'react';
import Link from 'next/link';
import { Fab } from '@rmwc/fab';
import { Add } from '../svg';
import TimersList from '../lists/timers-list';
import useTimers from '../hooks/use-timers';
import constants from '../constants';

import './dashboard.css';

export default () => {
  const timers = useTimers();

  console.table(timers);
  return (
    <div id="dashboard">
      <h1>Dashboard</h1>

      <TimersList items={timers} />
      
      <Link href={constants.ROUTES.TIMER.CREATE}>
        <a href={constants.ROUTES.TIMER.CREATE}>
          <Fab icon={<Add />} />
        </a>
      </Link>
    </div>
  );
};
