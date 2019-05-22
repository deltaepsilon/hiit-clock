import React from 'react';
import Link from 'next/link';
import { Fab } from '@rmwc/fab';
import { Add } from '../svg';
import TimersList from '../lists/timers-list';
import useTimers from '../hooks/use-timers';
import constants from '../constants';
import Title from '../top-bar/title';
import Logo from '../top-bar/logo';

import './dashboard.css';

export default () => {
  const timers = useTimers();

  return (
    <div id="dashboard">
      <Title>Dashboard</Title>
      <Logo href="/" />

      <TimersList items={timers} />

      <Link href={constants.ROUTES.TIMER.CREATE}>
        <a href={constants.ROUTES.TIMER.CREATE}>
          <Fab icon={<Add />} />
        </a>
      </Link>
    </div>
  );
};
