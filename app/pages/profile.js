import React from 'react';
import AppBase from '../components/app/app-base';
import Profile from '../components/page-components/profile';

export default props => {
  return (
    <AppBase secure>
      <Profile />
    </AppBase>
  );
};
