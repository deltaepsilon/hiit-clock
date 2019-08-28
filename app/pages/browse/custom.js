import React from 'react';
import AppBase from '../../components/app/app-base';
import Browse from '../../components/page-components/browse';
import BackButton from '../../components/top-bar/back-button';
import Title from '../../components/top-bar/title';
import useTimers from '../../components/hooks/use-timers';
import constants from '../../components/constants';

import '../page.css';

export default () => {
  return (
    <AppBase>
      <div id="custom" className="page">
        <BackButton href={constants.ROUTES.LANDING} />

        <Title large>Custom Timers</Title>

        <section>
          <h2>Search our Database</h2>
          <p>Find user-generated timers.</p>
          <p> Create your personal collection.</p>
        </section>

        <CustomTimers />
      </div>
    </AppBase>
  );
};

function CustomTimers() {
  const timers = useTimers();

  return <Browse items={timers} />;
}
