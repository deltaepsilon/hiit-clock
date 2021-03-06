import React, { useContext } from 'react';
import CastSender from './cast-sender';
import Environment from './environment';
import AlertsHandler from './alerts-handler';
import Fonts from './fonts';
import MdcStyles from './mdc-styles';
import Meta from './meta';
import RedditPixel from './reddit-pixel';
import Router from './router';
import AuthenticationProvider from '../contexts/authentication-context';
import AlertsProvider from '../contexts/alerts-context';
import LoadedProvider, { LoadedContext } from '../contexts/loaded-context';
import ProfileProvider from '../contexts/profile-context';
import SettingsProvider from '../contexts/settings-context';
import UserMenu from '../top-bar/user-menu';
import Analytics from './analytics';
import FirebasePerformance from './firebase-performance';
import SyncSettings from './sync-settings';
import useServiceWorker from '../hooks/use-service-worker';

import './app.css';
import '../top-bar/top-bar.css';
import '../modals/modal.css';

export function AppBase({ children, secure, hideUserMenu }) {
  useServiceWorker();

  return (
    <>
      <Analytics />
      <Environment />
      <FirebasePerformance />
      <Fonts />
      <MdcStyles />
      <Meta />
      <RedditPixel />
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
                    <AlertsHandler />
                    <CastSender />
                    <SyncSettings />
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
