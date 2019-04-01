import React from 'react';
import AppBase from '../../components/app/app-base';
import Browse from '../../components/page-components/browse';
import BackButton from '../../components/top-bar/back-button';

import '../page.css';

export default props => {
  return (
    <AppBase>
      <div id="custom" className="page">
        <BackButton url="/" visible pinned />
        <h1>Custom Timers</h1>

        <section>
          <h2>Search our Database</h2>
          <p>Find user-generated timers.</p>
          <p> Create your personal collection.</p>
        </section>

        <hr />

        <Browse />
      </div>
    </AppBase>
  );
};
