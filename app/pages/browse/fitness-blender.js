import React from 'react';
import AppBase from '../../components/app/app-base';
import Browse from '../../components/page-components/browse';
import BackButton from '../../components/top-bar/back-button';
import Title from '../../components/top-bar/title';
import items from '../../data/fitnessblender.json';
import constants from '../../components/constants';

import '../page.css';

export default props => {
  return (
    <AppBase>
      <div id="kettlebell" className="page">
        <BackButton href={constants.ROUTES.LANDING} />

        <Title large>Fitness Blender</Title>

        <section>
          <h2>Online Video Workouts</h2>

          <p>FitnessBlender.com is a massive library of easy-to-do workouts and programs.</p>
          <p>
            Check out FitnessBlender.com for the full experience. It's much better than anything
            you'll find on HIIT Clock.
          </p>
          <p>
            I personally prefer HIIT Clock to YouTube for my follow-along style workouts, so I've
            replicated a few of Fitness Blender's routines on HIIT Clock for convenience.
          </p>

          <p>
            - <a href="https://www.chrisesplin.com">Chris Esplin</a>, HIITClock.com
          </p>
        </section>

        <hr />

        <Browse userId={constants.SHARED_USER} items={items} />
      </div>
    </AppBase>
  );
};
