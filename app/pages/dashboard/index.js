import React from 'react';
import AppBase from '../../components/app/app-base';
import Dashboard from '../../components/page-components/dashboard';

export default props => {
  return (
    <AppBase secure>
      <Dashboard />
    </AppBase>
  );
};
