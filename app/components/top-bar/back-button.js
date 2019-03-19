import React from 'react';
import Link from 'next/link';
import { IconButton } from '@rmwc/icon-button';
import ArrowBack from '../svg/arrow-back';
import constants from '../constants';

import '@material/icon-button/dist/mdc.icon-button.css';

const showDashboardLinkPaths = [constants.ROUTES.SETTINGS];

export default ({ visible, url }) => {
  const isVisible = visible || showDashboardLinkPaths.includes(location.pathname);
  const style = isVisible ? {} : { visibility: 'hidden' };
  const href = url || constants.ROUTES.DASHBOARD;

  return (
    <div className="back-button" style={style}>
      <Link href={href}>
        <IconButton icon={<ArrowBack />} aria-label="user icon" tag="button" />
      </Link>
    </div>
  );
};
