import React, { useContext } from 'react';
import Router from 'next/router';
import { AuthenticationContext } from '../contexts/authentication-context';
import constants from '../constants';

export default ({ secure = false }) => {
  const { currentUser } = useContext(AuthenticationContext);
  const isLoggedOut = currentUser === null;
  const isLoggedIn = !!currentUser;
  const isOnLoginPage = location.pathname == constants.ROUTES.LOGIN;

  secure && isLoggedOut && Router.push(constants.ROUTES.LOGIN);

  isLoggedIn && isOnLoginPage && Router.push(constants.ROUTES.DASHBOARD);

  return null;
};
