import React, { useEffect, useState } from 'react';
import ServiceWorker from './service-worker';
import Environment from './environment';
import Firebase from './firebase';
import Fonts from './fonts';
import Meta from './meta';
import Router from './router';
import AuthenticationProvider from '../contexts/authentication-context';
import TopBar from '../top-bar/top-bar';

import './app.css';

export function AppBase({ children, secure }) {
  const [loaded, setLoaded] = useState(getPersistentIsLoaded());

  useEffect(() => {
    !loaded && window.addEventListener('load', () => setLoaded(true), setPersistentIsLoaded(true));
  }, [loaded]);

  return (
    <>
      <ServiceWorker />
      <Environment />
      <Firebase />
      <Fonts />
      <Meta />
      <AuthenticationProvider loaded={loaded}>
        <div id="app-base">
          {secure && <TopBar />}
          <div id="page-content">{children}</div>
        </div>
        <Router secure={secure} />
      </AuthenticationProvider>
    </>
  );
}

export default AppBase;

function getPersistentIsLoaded() {
  return (typeof window != 'undefined' && window.inMemoryIsLoaded) || false;
}

function setPersistentIsLoaded() {
  window.inMemoryIsLoaded = true;
}
