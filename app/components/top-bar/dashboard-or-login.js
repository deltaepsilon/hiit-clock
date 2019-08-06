import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import Link from 'next/link';
import { Button } from '@rmwc/button';
import { Dashboard, PlayCircleOutline } from '../svg';
import { AuthenticationContext } from '../contexts/authentication-context';
import constants from '../constants';

export default React.memo(() => {
  const el = window.document.querySelector('#back-button');

  return ReactDOM.createPortal(<DashboardOrLogin />, el);
});

function DashboardOrLogin({ href }) {
  const { currentUser } = useContext(AuthenticationContext);
  const showDashboard = !!currentUser;
  const dashboardHref = constants.ROUTES.DASHBOARD;
  const loginHref = constants.ROUTES.LOGIN;
  const width = 18;
  const height = 18;

  return showDashboard ? (
    <Link href={dashboardHref}>
      <Button
        icon={<Dashboard width={width} height={height} />}
        label="Dashboard"
        raised
        tag="a"
        href={dashboardHref}
      />
    </Link>
  ) : (
    <Link href={loginHref}>
      <Button
        icon={<PlayCircleOutline width={width} height={height} />}
        label="Login"
        raised
        tag="a"
        href={loginHref}
      />
    </Link>
  );
}
