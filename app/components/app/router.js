import React, { useContext } from 'react';
import { AuthenticationContext } from '../contexts/authentication-context';
import constants from '../constants';

const loginPaths = [constants.ROUTES.LOGIN];

export default function Router({ secure = false }) {
  const { currentUser } = useContext(AuthenticationContext);
  const isLoggedOut = currentUser === null;
  const isLoggedIn = !!currentUser;
  const isOnLoginPage = loginPaths.includes(location.pathname);

  if (secure && isLoggedOut) {
    location.pathname = constants.ROUTES.LOGIN;
  }

  if (isLoggedIn && isOnLoginPage) {
    location.pathname = constants.ROUTES.DASHBOARD;
  }

  return null;
}
