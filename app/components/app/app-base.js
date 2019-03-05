import React from 'react';
import ServiceWorker from './service-worker';

export default function AppBase({ children }) {
  return (
    <>
      <ServiceWorker />
      <>{children}</>
    </>
  );
}
