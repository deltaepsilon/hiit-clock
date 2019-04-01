import React, { useContext } from 'react';
import Link from 'next/link';
import { IconButton } from '@rmwc/icon-button';
import ArrowBack from '../svg/arrow-back';
import constants from '../constants';
import { HistoryContext } from '../contexts/history-context';

import '@material/icon-button/dist/mdc.icon-button.css';

const showDashboardLinkPaths = [constants.ROUTES.SETTINGS, constants.ROUTES.TIMER];

export default ({ visible, url }) => {
  const isVisible = visible || showDashboardLinkPaths.includes(location.pathname);
  const style = isVisible ? {} : { visibility: 'hidden' };
  const { urlHistory } = useContext(HistoryContext);
  const path = `${window.location.pathname}${window.location.search}`;
  const lastHistoryEntry = urlHistory.reverse().find(url => url != path);
  const href = url || lastHistoryEntry || constants.ROUTES.DASHBOARD;

  return (
    <div className="back-button" style={style}>
      <Link href={href}>
        <IconButton icon={<ArrowBack />} tag="button" />
      </Link>
    </div>
  );
};
