import React from 'react';
import AppBase from '../../components/app/app-base';
import Browse from '../../components/page-components/browse';
import BackButton from '../../components/top-bar/back-button';
import Title from '../../components/top-bar/title';
import items from '../../data/kettlebell.json';
import constants from '../../components/constants';

import '../page.css';

export default props => {
  return (
    <AppBase>
      <div id="kettlebell" className="page">
        <BackButton href={constants.ROUTES.LANDING} />

        <Title large>Kettlebell</Title>

        <section>
          <h2>Minimal/Effective</h2>

          <p>
            We've started out with a series of kettlebell workouts from{' '}
            <a href="https://kettlebellsworkouts.com/kettlebell-exercises/">
              kettlebellsworkouts.com
            </a>
          </p>
          <p>
            The workouts are meant for beginners and should be followed from 01 to 10. It's a
            gradual ramp up :)
          </p>
        </section>

        <hr />

        <Browse userId={constants.SHARED_USER} items={items} />
      </div>
    </AppBase>
  );
};
