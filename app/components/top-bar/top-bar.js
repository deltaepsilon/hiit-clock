import React from 'react';
import UserMenu from './user-menu';

import './top-bar.css';

export default props => {
  return (
    <>
      <div id="top-bar">
        <div className="grow" />
        <UserMenu />
      </div>
    </>
  );
};
