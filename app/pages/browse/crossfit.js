import React from 'react';
import AppBase from '../../components/app/app-base';
import Browse from '../../components/page-components/browse';
import BackButton from '../../components/top-bar/back-button';
import Title from '../../components/top-bar/title';
import items from '../../data/crossfit.json';
import constants from '../../components/constants';

import '../page.css';

export default props => {
  return (
    <AppBase>
      <div id="crossfit" className="page">
        <BackButton href={constants.ROUTES.LANDING} />

        <Title large>Crossfit</Title>

        <section>
          <h2>The Girls</h2>
          <p>The Girls workouts have been Crossfit benchmarks since 2003</p>
          <p>
            Grab a{' '}
            <a
              href="https://stuff.crossfit.com/products/copy-of-the-girls-poster"
              target="_blank"
              rel="noopener noreferrer"
            >
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

        <Browse userId={constants.SHARED_USER} items={items} />
      </div>
    </AppBase>
  );
};
