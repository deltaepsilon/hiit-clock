import React, { useEffect, useState } from 'react';
import ServiceWorker from './service-worker';
import Environment from './environment';
import Firebase from './firebase';
import Fonts from './fonts';
import Meta from './meta';
import Router from './router';
import AuthenticationProvider from '../contexts/authentication-context';
import ProfileProvider from '../contexts/profile-context';
import TopBar from '../top-bar/top-bar';

import './app.css';

export function AppBase({ children, secure }) {
  const [loaded, setLoaded] = useState(getPersistentIsLoaded());

  useEffect(() => {
    function onLoad() {
      setLoaded(true);
      setPersistentIsLoaded(true);
    }

    function subscribe() {
      window.addEventListener('load', onLoad);

      return () => window.removeEventListener('load', onLoad);
    }

    return loaded ? () => {} : subscribe();
  }, [loaded]);

  return (
    <>
      <ServiceWorker />
      <Environment />
      <Firebase />
      <Fonts />
      <Meta />
      <AuthenticationProvider loaded={loaded}>
        <ProfileProvider>
          <>
            <div id="app-base">
              {secure && <TopBar />}
              <div id="page-content">{children}</div>
            </div>
            <Router secure={secure} />
          </>
        </ProfileProvider>
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
