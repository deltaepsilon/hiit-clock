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
            We're starting with workouts from{' '}
            <a
              href="https://kettlebellsworkouts.com/kettlebell-exercises/"
              target="_blank"
              rel="noopener noreferrer"
            >
              KettlebellsWorkouts.com
            </a>{' '}
            and{' '}
            <a
              href="https://www.cavemantraining.com/kettlebell-workouts/"
              target="_blank"
              rel="noopener noreferrer"
            >
              CavemanTraining.com
            </a>
          </p>
        </section>

        <hr />

        <Browse userId={constants.SHARED_USER} items={items} />
      </div>
    </AppBase>
  );
};
