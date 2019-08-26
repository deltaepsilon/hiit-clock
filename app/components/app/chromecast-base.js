import React from 'react';
import Environment from './environment';
import Fonts from './fonts';
import MDCStyles from './mdc-styles';
import Meta from './meta';
import CastReceiver from './cast-receiver';

import './app.css';
import './chromecast.css';

export function AppBase({ children, className = '' }) {
  return (
    <>
      <CastReceiver />
      <Environment />
      <Fonts />
      <MDCStyles />
      <Meta />
      <>
        <div id="app-base" className={`chromecast-base ${className}`}>
          <div id="page-content">{children}</div>
        </div>
      </>
    </>
  );
}

export default AppBase;
