/* globals window */
import React, { useState, useEffect } from 'react';
import constants from '../constants';

const defaultSettings = {
  soundAlertsEnabled: false,
  flashAlertsEnabled: true,
};

export default function useSettings() {
  const [settings, setSettings] = useState(defaultSettings);

  useEffect(() => {
    return subscribe(setSettings);
  });

  return settings;
}

function subscribe(setSettings) {
  function getAndSetProfile() {
    const settingsString = localStorage.getItem(constants.LOCALSTORAGE.SETTINGS) || '';
    const settings = JSON.parse(settingsString);

    setSettings(settings);
  }

  window.addEventListener('storage', getAndSetProfile);

  return () => window.removeEventListener('storage', getAndSetProfile);
}
