import React from 'react';
import ServiceWorker from './service-worker';
import AppFonts from "./app-fonts";
import AppMeta from "./app-meta";
import AppStyle from "./app-style";



export default function AppBase({ children }) {
  return (
    <>
      <ServiceWorker />
      <AppFonts />
      <AppMeta />
      <AppStyle />
      <>{children}</>
    </>
  );
}
