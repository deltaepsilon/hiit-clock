import React from 'react';
import AppBase from '../../components/app/app-base';
import Browse from '../../components/page-components/browse';
import BackButton from '../../components/top-bar/back-button';
import Title from '../../components/top-bar/title';
import items from '../../data/powerlifting.json';
import constants from '../../components/constants';

import '../page.css';

export default props => {
  return (
    <AppBase>
      <div id="powerlifting" className="page">
        <BackButton href={constants.ROUTES.LANDING} />

        <Title large>powerlifting</Title>

        <section>
          <h2>Generous Rest Periods</h2>
          <p>
            These intervals are inspired by{' '}
            <a href="https://startingstrength.com/" target="_blank" rel="noopener noreferrer">
              Starting Strength
            </a>{' '}
            by Mark Rippetoe.
          </p>
        </section>

        <Browse userId={constants.SHARED_USER} items={items} />
      </div>
    </AppBase>
  );
};
