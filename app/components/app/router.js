import React, { useContext } from 'react';
import Router from 'next/router';
import { AuthenticationContext } from '../contexts/authentication-context';
import constants from '../constants';


const loginPaths = [
  constants.ROUTES.LOGIN,
  constants.ROUTES.LOGIN.slice(0, constants.ROUTES.LOGIN.length - 1),
];

export default ({ secure = false }) => {
  const { currentUser } = useContext(AuthenticationContext);
  const isLoggedOut = currentUser === null;
  const isLoggedIn = !!currentUser;
  const isOnLoginPage = loginPaths.includes(location.pathname);

  secure && isLoggedOut && Router.push(constants.ROUTES.LOGIN);

  isLoggedIn && isOnLoginPage && Router.push(constants.ROUTES.DASHBOARD);

  return null;
};
