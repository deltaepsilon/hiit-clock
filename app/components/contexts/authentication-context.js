/* globals window */
import React, { useState, useEffect } from 'react';

export const AuthenticationContext = React.createContext();

export default ({ children, loaded }) => {
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
