import React from 'react';
import AppBase from '../../components/app/app-base';
import Browse from '../../components/page-components/browse';
import BackButton from '../../components/top-bar/back-button';
import items from '../../data/stronglifts.json';

import '../page.css';

export default props => {
  return (
    <AppBase secure>
      <div id="stronglifts" className="page">
        <BackButton url="/" visible pinned />
        <h1>Stronglifts</h1>

        <section>
          <h2>A Companion App</h2>
          <p>
            We haven't used the{' '}
            <a href="https://stronglifts.com/" target="_blank">
              Stronglifts App for Android or iOS
            </a>
            . Maybe check it out?
          </p>
          <p>
            If you'd still like the full Hiit Clock experience, here are a few Stronglifts-inspired
            timers to get you started. Personalize and extend them to taste.
          </p>
        </section>

        <hr />

        <Browse items={items} />
      </div>
    </AppBase>
  );
};
