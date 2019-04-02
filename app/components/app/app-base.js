import React, { useContext } from 'react';
import ServiceWorker from './service-worker';
import Environment from './environment';
import Firebase from './firebase';
import Fonts from './fonts';
import MDCStyles from './mdc-styles';
import Meta from './meta';
import Router from './router';
import AuthenticationProvider from '../contexts/authentication-context';
import LoadedProvider, { LoadedContext } from '../contexts/loaded-context';
import ProfileProvider from '../contexts/profile-context';
import SettingsProvider from '../contexts/settings-context';
import TopBar from '../top-bar/top-bar';

import './app.css';

export function AppBase({ children, secure, topBar }) {
  const shouldShowTopBar = secure || topBar;

  return (
    <>
      <ServiceWorker />
      <Environment />
      <Firebase />
      <Fonts />
      <MDCStyles />
      <Meta />
      <LoadedProvider>
        <AuthenticationProvider>
          <ProfileProvider>
            <SettingsProvider>
              <RenderIfLoaded>
                <>
                  <div id="app-base">
                    {shouldShowTopBar && <TopBar />}
                    <div id="page-content">{children}</div>
                  </div>
                  <Router secure={secure} />
                </>
              </RenderIfLoaded>
            </SettingsProvider>
          </ProfileProvider>
        </AuthenticationProvider>
      </LoadedProvider>
    </>
  );
}

export default AppBase;

function RenderIfLoaded({ children }) {
  const loaded = useContext(LoadedContext);

  return loaded ? <>{children}</> : null;
}
