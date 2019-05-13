import React, { useContext } from 'react';
import Link from 'next/link';
import { IconButton } from '@rmwc/icon-button';
import ArrowBack from '../svg/arrow-back';
import constants from '../constants';
import { AuthenticationContext } from '../contexts/authentication-context';

const showLinkPaths = [
  constants.ROUTES.SETTINGS,
  constants.ROUTES.TIMER.DETAIL,
  constants.ROUTES.TIMER.CREATE,
  constants.ROUTES.TIMER.EDIT,
  constants.ROUTES.TIMER.EDIT + '/',
  constants.ROUTES.LOGIN,
];

export default React.memo(({ visible, url }) => {
  const { currentUser } = useContext(AuthenticationContext);
  const isLoggedIn = !!currentUser;
  const pathname = location.pathname;
  const isVisible = visible || showLinkPaths.includes(pathname);
  const style = isVisible ? {} : { visibility: 'hidden' };
  const fallbackUrl = isLoggedIn ? constants.ROUTES.DASHBOARD : constants.ROUTES.LANDING;
  const href = url || fallbackUrl;

  return (
    <div className="back-button" style={style}>
      <Link href={href}>
        <IconButton icon={<ArrowBack />} tag="a" href={href} />
      </Link>
    </div>
  );
});
