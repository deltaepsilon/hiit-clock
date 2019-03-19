import React from 'react';
import AppBase from '../../components/app/app-base';
import Browse from '../../components/page-components/browse';
import BackButton from '../../components/top-bar/back-button';
import items from '../../data/crossfit.json';

import '../page.css';

export default props => {
  return (
    <AppBase secure>
      <div id="crossfit" className="page">
        <BackButton url="/" visible pinned />
        <h1>Crossfit</h1>

        <section>
          <h2>The Girls</h2>
          <p>The Girls workouts have been Crossfit benchmarks since 2003</p>
          <p>
            Grab a{' '}
            <a href="https://stuff.crossfit.com/products/copy-of-the-girls-poster" target="_blank">
              poster
            </a>{' '}
            for your muscle garage, and use these timers to get motivated.
          </p>
        </section>

        <hr />

        <section>
          <h2>AMRAP</h2>
          <p>We've included some AMRAP timers for convenience 😉</p>
        </section>

        <hr />

        <Browse items={items} />
      </div>
    </AppBase>
  );
};
