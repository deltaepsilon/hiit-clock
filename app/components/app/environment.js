/* globals window */
import React, { useEffect } from 'react';
import devEnv from '../../environments/app-env.dev';
import prodEnv from '../../environments/app-env.prod';

export default function Environment() {
  const isDev = typeof window != 'undefined' && window.location.hostname == 'localhost';
  const environment = isDev ? devEnv : prodEnv;

  useEffect(() => {
    window.environment = environment;
  });

  return null;
}
