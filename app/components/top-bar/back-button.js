import React, { useContext } from 'react';
import Link from 'next/link';
import { IconButton } from '@rmwc/icon-button';
import ArrowBack from '../svg/arrow-back';
import constants from '../constants';
import { AuthenticationContext } from '../contexts/authentication-context';

const showLinkPaths = [constants.ROUTES.SETTINGS, constants.ROUTES.TIMER];
const showLinkPathsWithProd = showLinkPaths.concat(showLinkPaths.map(path => path + '/'));

export default ({ visible, url }) => {
  const { currentUser } = useContext(AuthenticationContext);
  const pathname = location.pathname;
  const isVisible = visible || showLinkPathsWithProd.includes(pathname);
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
