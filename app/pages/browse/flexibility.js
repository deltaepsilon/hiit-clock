import React from 'react';
import AppBase from '../../components/app/app-base';
import Browse from '../../components/page-components/browse';
import BackButton from '../../components/top-bar/back-button';
import Title from '../../components/top-bar/title';
import items from '../../data/flexibility.json';
import constants from '../../components/constants';

import '../page.css';

export default props => {
  return (
    <AppBase>
      <div id="kettlebell" className="page">
        <BackButton href={constants.ROUTES.LANDING} />

        <Title large>Flexibility</Title>

        <section>
          <h2>Beginner to Splits</h2>

          <p>
            This is a series of flexibility routines that I used to achieve the side splits and make
            massive progress toward the middle splits.
          </p>
          <p>
            The routines are meant for beginners. Routine 01 should be followed daily for a period
            of time before progressing to routine 02. The routines should be followed from 01 to 05
            before starting the dedicated Middle Splits and Side Splits routines.
          </p>
          <p>
            I spent a month on each of the first five numbered routines, moving to the next routine
            when my progress appeared to have stalled. I was about six months in when I started
            alternating the Middle Splits and Side Splits routines. I landed my side splits around
            the 12-month mark. I'm still working on the middle splits and expect them to take a
            total of about 24 months to achieve.
          </p>
          <p>
            These routines are provided as inspiration. Some of the stretches are likely difficult
            to replicate and may require a lot of modification. I don't think the specifics of the
            routines are particularly important; however, 20+ minutes of serious stretching every
            day makes all of the difference.
          </p>
          <p>
            - <a href="https://www.chrisesplin.com" target="_blank" rel="noopener noreferrer">Chris Esplin</a>, HIITClock.com
          </p>
        </section>

        <hr />

        <Browse userId={constants.SHARED_USER} items={items} />
      </div>
    </AppBase>
  );
};
