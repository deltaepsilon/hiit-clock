import React, { useContext } from 'react';
import ServiceWorker from './service-worker';
import Environment from './environment';
import ErrorHandler from './error-handler';
import Firebase from './firebase';
import Fonts from './fonts';
import MDCStyles from './mdc-styles';
import Meta from './meta';
import Router from './router';
import AuthenticationProvider from '../contexts/authentication-context';
import ErrorsProvider from '../contexts/errors-context';
import LoadedProvider, { LoadedContext } from '../contexts/loaded-context';
import ProfileProvider from '../contexts/profile-context';
import SettingsProvider from '../contexts/settings-context';
import UserMenu from '../top-bar/user-menu';

import './app.css';
import '../top-bar/top-bar.css';

export function AppBase({ children, secure, hideUserMenu }) {
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
          <ErrorsProvider>
            <ProfileProvider>
              <SettingsProvider>
                <RenderIfLoaded>
                  <>
                    <div id="app-base">
                      <div id="page-content">{children}</div>
                    </div>
                    {!hideUserMenu && <UserMenu />}
                    <Router secure={secure} />
                    <ErrorHandler />
                  </>
                </RenderIfLoaded>
              </SettingsProvider>
            </ProfileProvider>
          </ErrorsProvider>
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
