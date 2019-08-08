/* global window */
import constants from '../components/constants';
import localStorage from "./local-storage";

export default async function saveSettings(newSettings) {
  const existingSettingsString = localStorage.getItem(constants.LOCALSTORAGE.SETTINGS) || '{}';
  const existingSettings = JSON.parse(existingSettingsString);
  const settings = { ...existingSettings, ...newSettings };
  const settingsString = JSON.stringify(settings);

  localStorage.setItem(constants.LOCALSTORAGE.SETTINGS, settingsString);

  return settings;
}
