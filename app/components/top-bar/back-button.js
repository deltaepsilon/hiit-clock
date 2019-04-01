import React, { useContext } from 'react';
import Link from 'next/link';
import { IconButton } from '@rmwc/icon-button';
import ArrowBack from '../svg/arrow-back';
import constants from '../constants';
import { AuthenticationContext } from '../contexts/authentication-context';

import '@material/icon-button/dist/mdc.icon-button.css';

const showDashboardLinkPaths = [constants.ROUTES.SETTINGS, constants.ROUTES.TIMER];

export default ({ visible, url }) => {
  const { currentUser } = useContext(AuthenticationContext);
  const isVisible = visible || showDashboardLinkPaths.includes(location.pathname);
  const style = isVisible ? {} : { visibility: 'hidden' };
  const fallbackUrl = !!currentUser ? constants.ROUTES.DASHBOARD : constants.ROUTES.BROWSE;
  const href = url || fallbackUrl;

  return (
    <div className="back-button" style={style}>
      <Link href={href}>
        <IconButton icon={<ArrowBack />} tag="button" />
      </Link>
    </div>
  );
};
