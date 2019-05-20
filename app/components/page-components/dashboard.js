import React from 'react';
import Link from 'next/link';
import { Fab } from '@rmwc/fab';
import constants from '../constants';
import { Add } from '../svg';

import './dashboard.css';

export default props => {
  return (
    <div id="dashboard">
      <h1>Dashboard</h1>
      <Link href={constants.ROUTES.TIMER.CREATE}>
        <a href={constants.ROUTES.TIMER.CREATE}>
          <Fab icon={<Add />} />
        </a>
      </Link>
    </div>
  );
};
