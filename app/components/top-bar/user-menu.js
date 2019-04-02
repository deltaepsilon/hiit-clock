import React, { useContext, useState } from 'react';
import Router from 'next/router';
import { IconButton } from '@rmwc/icon-button';
import { Button } from '@rmwc/button';
import { Menu, MenuItem, MenuSurface, MenuSurfaceAnchor } from '@rmwc/menu';
import { ListDivider } from '@rmwc/list';
import { AuthenticationContext } from '../contexts/authentication-context';
import constants from '../constants';
import effects from '../../effects';

import './user-menu.css';

export default props => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useContext(AuthenticationContext);
  const photoURL = !currentUser ? '' : currentUser.photoURL || constants.PATHS.ACCOUNT_CIRCLE;

  const menuItems = [
    {
      html: <MenuItem key="dashboard">Dashboard</MenuItem>,
      action: () => Router.push(constants.ROUTES.DASHBOARD),
      hidden: location.pathname == constants.ROUTES.DASHBOARD,
    },
    {
      html: <MenuItem key="settings">Settings</MenuItem>,
      action: () => Router.push(constants.ROUTES.SETTINGS),
      hidden: location.pathname == constants.ROUTES.SETTINGS,
    },
    {
      html: <ListDivider key="bottom-divider" />,
    },
    { html: <MenuItem key="log-out">Log Out</MenuItem>, action: () => effects.signOut() },
  ].filter(({ hidden }) => !hidden);

  return (
    <div id="user-menu">
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
    </div>
  );
};

function get(params) {}
