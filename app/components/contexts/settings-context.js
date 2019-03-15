/* globals window */
import React from 'react';
import useSettings from '../hooks/use-settings';

export const SettingsContext = React.createContext();

export default ({ children }) => {
  const settings = useSettings();

  return <SettingsContext.Provider value={settings}>{children}</SettingsContext.Provider>;
};
