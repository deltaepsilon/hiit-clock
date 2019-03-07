import React from 'react';
import ServiceWorker from './service-worker';
import AppFonts from './app-fonts';
import AppMeta from './app-meta';

import './app.css';

export function AppBase({ children }) {
  return (
    <>
      <ServiceWorker />
      <AppFonts />
      <AppMeta />
      <>{children}</>
    </>
  );
}

export default AppBase;
