import React from 'react';
import BackButton from './back-button';
import UserMenu from './user-menu';

import './top-bar.css';

const showDashboardLinkPaths = ['/profile'];

export default props => {
  return (
    <>
      <div id="top-bar">
        <BackButton />
        <div className="grow" />
        <UserMenu />
      </div>
    </>
  );
};
