import React from 'react';
import BackButton from './back-button';
import UserMenu from './user-menu';
import Title from './title';

import './top-bar.css';

export default props => {
  return (
    <>
      <div id="top-bar">
        <BackButton />
        <Title className="grow" />
        <UserMenu />
      </div>
    </>
  );
};
