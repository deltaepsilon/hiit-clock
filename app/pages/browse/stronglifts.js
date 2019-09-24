import React from 'react';
import AppBase from '../../components/app/app-base';
import Browse from '../../components/page-components/browse';
import BackButton from '../../components/top-bar/back-button';
import Title from '../../components/top-bar/title';
import items from '../../data/stronglifts.json';
import constants from '../../components/constants';

import '../page.css';

export default props => {
  return (
    <AppBase>
      <div id="stronglifts" className="page">
        <BackButton href={constants.ROUTES.LANDING} />

        <Title large>Stronglifts</Title>

        <section>
          <h2>A Companion App</h2>
          <p>
            We haven't used the{' '}
            <a href="https://stronglifts.com/" target="_blank" rel="noopener noreferrer">
              Stronglifts App for Android or iOS
            </a>
            . Maybe check it out?
          </p>
          <p>
            If you'd still like the full Hiit Clock experience, here are a few Stronglifts-inspired
            timers to get you started. Personalize and extend them to taste.
          </p>
        </section>

        <Browse userId={constants.SHARED_USER} items={items} />
      </div>
    </AppBase>
  );
};
