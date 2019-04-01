import React from 'react';
import AppBase from '../components/app/app-base';
import TimerDetails from '../components/page-components/timer-details';

export default props => {
  return (
    <AppBase topBar>
      <TimerDetails />
    </AppBase>
  );
};
