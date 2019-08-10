import React, { useContext } from 'react';
import ServiceWorker from './service-worker';
import Environment from './environment';
import ErrorHandler from './alerts-handler';
import Fonts from './fonts';
import MDCStyles from './mdc-styles';
import Meta from './meta';
import AlertsProvider from '../contexts/alerts-context';
import LoadedProvider, { LoadedContext } from '../contexts/loaded-context';

import './app.css';
import './chromecast.css';

export function AppBase({ children }) {
  return (
    <>
      <ServiceWorker />
      <Environment />
      <Fonts />
      <MDCStyles />
      <Meta />
      <LoadedProvider>
        <AlertsProvider>
          <RenderIfLoaded>
            <>
              <div id="app-base" className="chromecast-base">
                <div id="page-content">{children}</div>
              </div>
              <ErrorHandler />
            </>
          </RenderIfLoaded>
        </AlertsProvider>
      </LoadedProvider>
    </>
  );
}

export default AppBase;

function RenderIfLoaded({ children }) {
  const loaded = useContext(LoadedContext);

  return loaded ? <>{children}</> : null;
}
