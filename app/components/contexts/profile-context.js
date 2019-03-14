/* globals window */
import React, { useContext } from 'react';
import { AuthenticationContext } from '../contexts/authentication-context';
import useProfile from '../hooks/use-profile';

export const ProfileContext = React.createContext();

export default ({ children }) => {
  const currentUser = useContext(AuthenticationContext);
  const profile = useProfile(currentUser && currentUser.uid);

  return <ProfileContext.Provider value={profile}>{children}</ProfileContext.Provider>;
};
