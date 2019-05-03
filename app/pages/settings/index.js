import React from 'react';
import AppBase from '../../components/app/app-base';
import Settings from '../../components/page-components/settings';

export default props => {
  return (
    <AppBase secure>
      <Settings />
    </AppBase>
  );
};
