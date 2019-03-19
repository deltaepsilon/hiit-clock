import React from 'react';

import TimersList from '../lists/timers-list';

import '@material/button/dist/mdc.button.css';

export default ({ items }) => {
  return (
    <div id="browse">
      <section>
        <TimersList searchLabel="Filter" items={items} />
      </section>
    </div>
  );
};
