import React from 'react';
import AppBase from '../../components/app/app-base';
import TimerEdit from '../../components/page-components/timer-edit';

export default props => {
  return (
    <AppBase topBar>
      <TimerEdit />
    </AppBase>
  );
};
