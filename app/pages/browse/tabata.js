import React from 'react';
import AppBase from '../../components/app/app-base';
import Browse from '../../components/page-components/browse';
import BackButton from '../../components/top-bar/back-button';
import Title from '../../components/top-bar/title';
import items from '../../data/tabata.json';
import constants from '../../components/constants';

import '../page.css';

export default props => {
  return (
    <AppBase>
      <div id="tabata" className="page">
        <BackButton href={constants.ROUTES.LANDING} />

        <Title large>Tabata</Title>

        <section>
          <h2>Generic and Brutal</h2>
          <p>Tabata intervals are evil. And effective. And still evil.</p>
          <p>
            But don't take our word for it. Read this{' '}
            <a
              href="https://breakingmuscle.com/fitness/how-tabata-really-works-what-the-research-says"
              target="_blank"
            >
              research review
            </a>{' '}
            for the gory details.
          </p>
        </section>

        <Browse userId={constants.SHARED_USER} items={items} />
      </div>
    </AppBase>
  );
};
