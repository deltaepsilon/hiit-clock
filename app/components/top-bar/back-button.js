import React from 'react';
import Link from 'next/link';
import { IconButton } from '@rmwc/icon-button';
import ArrowBack from '../svg/arrow-back';
import constants from '../constants';

import '@material/icon-button/dist/mdc.icon-button.css';

const showDashboardLinkPaths = [constants.ROUTES.SETTINGS];

export default props => {
  const isVisible = showDashboardLinkPaths.includes(location.pathname);
  const style = isVisible ? {} : { visibility: 'hidden' };

  return (
    <div style={style}>
      <Link href={constants.ROUTES.DASHBOARD}>
        <IconButton icon={<ArrowBack />} aria-label="user icon" tag="button" />
      </Link>
    </div>
  );
};
