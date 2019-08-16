import React, { useContext } from 'react';
import CastSender from './cast-sender';
import Environment from './environment';
import ErrorHandler from './alerts-handler';
import Fonts from './fonts';
import MDCStyles from './mdc-styles';
import Meta from './meta';
import Router from './router';
import AuthenticationProvider from '../contexts/authentication-context';
import AlertsProvider from '../contexts/alerts-context';
import LoadedProvider, { LoadedContext } from '../contexts/loaded-context';
import ProfileProvider from '../contexts/profile-context';
import SettingsProvider from '../contexts/settings-context';
import UserMenu from '../top-bar/user-menu';
import FirebasePerformance from './firebase-performance';
import useServiceWorker from '../hooks/use-service-worker';

import './app.css';
import '../top-bar/top-bar.css';
import '../modals/modal.css';

export function AppBase({ children, secure, hideUserMenu }) {
  useServiceWorker();

  return (
    <>
      <Environment />
      <FirebasePerformance />
      <Fonts />
      <MDCStyles />
      <Meta />
      <LoadedProvider>
        <AuthenticationProvider>
          <AlertsProvider>
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
                    <CastSender />
                  </>
                </RenderIfLoaded>
              </SettingsProvider>
            </ProfileProvider>
          </AlertsProvider>
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
