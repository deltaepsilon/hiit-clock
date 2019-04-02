import React from 'react';
import TimersList from '../lists/timers-list';

import './browse.css';

export default ({ items }) => {
  return (
    <div id="browse">
      <section>
        <TimersList searchLabel="Filter" items={items} />
      </section>
    </div>
  );
};
