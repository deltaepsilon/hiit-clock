/* globals window */
import { useState, useEffect } from 'react';
import constants from '../constants';

const DEFAULT_SETTINGS = {
  soundAlertsEnabled: false,
  flashAlertsEnabled: true,
  soundIndex: 0,
};

export default function useSettings() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  useEffect(() => {
    return subscribe(setSettings);
  }, []);

  return settings;
}

function subscribe(setSettings) {
  function getAndSetProfile() {
    const settingsString = localStorage.getItem(constants.LOCALSTORAGE.SETTINGS) || '{}';
    const settings = JSON.parse(settingsString);

    setSettings({ ...DEFAULT_SETTINGS, ...settings });
  }

  window.addEventListener('storage', getAndSetProfile);

  getAndSetProfile();

  return () => window.removeEventListener('storage', getAndSetProfile);
}
