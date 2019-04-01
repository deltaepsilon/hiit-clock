/* globals window */
import React, { useState, useEffect, useContext } from 'react';
import { LoadedContext } from './loaded-context';

export const AuthenticationContext = React.createContext();

export default ({ children }) => {
  const loaded = useContext(LoadedContext);
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => (loaded ? window.firebase.auth().onAuthStateChanged(setCurrentUser) : () => {}), [
    loaded,
  ]);

  return (
    <AuthenticationContext.Provider value={{ currentUser }}>
      {children}
    </AuthenticationContext.Provider>
  );
};
