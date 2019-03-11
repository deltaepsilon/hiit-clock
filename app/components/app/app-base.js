import React from 'react';
import ServiceWorker from './service-worker';
import Environment from "./environment";
import Firebase from './firebase';
import Fonts from './fonts';
import Meta from './meta';

import './app.css';

export function AppBase({ children }) {
  return (
    <>
      <ServiceWorker />
      <Environment />
      <Firebase />
      <Fonts />
      <Meta />
      <div id="app-base">{children}</div>
    </>
  );
}

export default AppBase;
