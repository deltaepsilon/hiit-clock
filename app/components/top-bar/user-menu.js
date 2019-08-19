import React, { useContext, useState } from 'react';
import ReactDOM from 'react-dom';
import { useRouter } from 'next/router';
import { IconButton } from '@rmwc/icon-button';
import { Headset } from '../svg';
import { Menu, MenuItem, MenuSurfaceAnchor } from '@rmwc/menu';
import { ListDivider } from '@rmwc/list';
import { AuthenticationContext } from '../contexts/authentication-context';
import { SettingsContext } from '../contexts/settings-context';
import useSound from '../hooks/use-sound';
import constants from '../constants';
import effects from '../../effects';

export default React.memo(() => {
  const router = useRouter();

  const el = window.document.querySelector('#user-menu');
  const isTimerDetailPage = router.pathname == constants.ROUTES.TIMER.DETAIL;
  const menu = isTimerDetailPage ? <MicroMenu /> : <UserMenu />;

  return ReactDOM.createPortal(menu, el);
});

function UserMenu() {
  const router = useRouter();
  const { currentUser } = useContext(AuthenticationContext);
  const [isOpen, setIsOpen] = useState(false);
  const photoURL = (currentUser && currentUser.photoURL) || constants.PATHS.ACCOUNT_CIRCLE;

  const menuItems = [
    {
      html: <MenuItem key="dashboard">Dashboard</MenuItem>,
      action: () => router.push(constants.ROUTES.DASHBOARD),
      hidden: location.pathname == constants.ROUTES.DASHBOARD,
    },
    {
      html: <MenuItem key="settings">Settings</MenuItem>,
      action: () => router.push(constants.ROUTES.SETTINGS),
      hidden: location.pathname == constants.ROUTES.SETTINGS,
    },
    {
      html: <ListDivider key="bottom-divider" />,
    },
    { html: <MenuItem key="log-out">Log Out</MenuItem>, action: () => effects.signOut() },
  ].filter(({ hidden }) => !hidden);

  return currentUser ? (
    <>
      <MenuSurfaceAnchor>
        <Menu
          open={isOpen}
          onSelect={e => {
            const menuItemsWithActions = menuItems.filter(({ action }) => !!action);
            const i = e.detail.index;

            menuItemsWithActions[i].action();
          }}
          onClose={() => setIsOpen(false)}
        >
          {menuItems.map(({ html }) => html)}
        </Menu>
        <IconButton
          icon={photoURL}
          aria-label="user icon"
          tag="button"
          onClick={() => setIsOpen(true)}
        />
      </MenuSurfaceAnchor>
    </>
  ) : null;
}

function MicroMenu() {
  const router = useRouter();
  const { playChime } = useSound();
  const { soundAlertsEnabled, flashAlertsEnabled } = useContext(SettingsContext);
  const bothEnabled = soundAlertsEnabled && flashAlertsEnabled;
  const fill = bothEnabled ? constants.COLORS.ENABLED_LIGHT : constants.COLORS.DISABLED_LIGHT;
  const isTimerDetailPage = router.pathname == constants.ROUTES.TIMER.DETAIL;

  return isTimerDetailPage ? (
    <IconButton
      icon={<Headset fill={fill} />}
      aria-label="audio toggle"
      tag="button"
      onClick={() => {
        const enableAlerts = !bothEnabled;

        enableAlerts && playChime();

        effects.saveSettings({
          flashAlertsEnabled: enableAlerts,
          soundAlertsEnabled: enableAlerts,
        });
      }}
    />
  ) : null;
}
