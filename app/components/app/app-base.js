import React, { useEffect, useState } from 'react';
import ServiceWorker from './service-worker';
import Environment from './environment';
import Firebase from './firebase';
import Fonts from './fonts';
import Meta from './meta';
import Router from './router';
import AuthenticationProvider from '../contexts/authentication-context';
import LocationProvider from '../contexts/history-context';
import ProfileProvider from '../contexts/profile-context';
import SettingsProvider from '../contexts/settings-context';
import TopBar from '../top-bar/top-bar';

import './app.css';

export function AppBase({ children, secure, topBar }) {
  const [loaded, setLoaded] = useState(getPersistentIsLoaded());
  const shouldShowTopBar = secure || topBar

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
        <LocationProvider>
          <ProfileProvider>
            <SettingsProvider>
              <>
                <div id="app-base">
                  {shouldShowTopBar && <TopBar />}
                  <div id="page-content">{children}</div>
                </div>
                <Router secure={secure} />
              </>
            </SettingsProvider>
          </ProfileProvider>
        </LocationProvider>
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
