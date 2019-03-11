import React from 'react';
import ServiceWorker from './service-worker';
import Firebase from './firebase';
import Fonts from './fonts';
import Meta from './meta';

import './app.css';

export function AppBase({ children }) {
  return (
    <>
      <ServiceWorker />
      <Firebase />
      <Fonts />
      <Meta />
      <div id="app-base">{children}</div>
    </>
  );
}

export default AppBase;
