/* globals window */
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { LoadedContext } from './loaded-context';

export const AuthenticationContext = React.createContext();

export default ({ children }) => {
  const loaded = useContext(LoadedContext);
  const [currentUser, setCurrentUser] = useState();
  const updateCurrentUser = useCallback(() => {
    const currentUser = window.firebase.auth().currentUser;

    setCurrentUser({ ...currentUser });
  });

  useEffect(() => {
    if (loaded) {
      return window.firebase.auth().onAuthStateChanged(setCurrentUser);
    }
  }, [loaded]);

  return (
    <AuthenticationContext.Provider value={{ currentUser, updateCurrentUser }}>
      {children}
    </AuthenticationContext.Provider>
  );
};
