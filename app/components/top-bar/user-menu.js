import React, { useContext, useState } from 'react';
import Router from 'next/router';
import { IconButton } from '@rmwc/icon-button';
import { Button } from '@rmwc/button';
import { Menu, MenuItem, MenuSurface, MenuSurfaceAnchor } from '@rmwc/menu';
import { ListDivider } from '@rmwc/list';
import { AuthenticationContext } from '../contexts/authentication-context';
import constants from '../constants';
import effects from '../../effects';

import '@material/icon-button/dist/mdc.icon-button.css';
import '@material/button/dist/mdc.button.css';
import '@material/menu/dist/mdc.menu.css';
import '@material/menu-surface/dist/mdc.menu-surface.css';
import '@material/list/dist/mdc.list.css';
import './user-menu.css';

export default props => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useContext(AuthenticationContext);
  const photoURL = !currentUser ? '' : currentUser.photoURL || constants.PATHS.ACCOUNT_CIRCLE;

  return (
    <div id="user-menu">
      <MenuSurfaceAnchor>
        <Menu
          open={isOpen}
          onSelect={e => {
            console.log('e.detail.index', e.detail.index);
            switch (e.detail.index) {
              case 0:
                Router.push(constants.ROUTES.PROFILE);
                break;

              case 1:
                effects.signOut();
                break;

              default:
                setIsOpen(false);
                break;
            }
          }}
          onClose={() => setIsOpen(false)}
        >
          <MenuItem>Profile</MenuItem>
          <ListDivider />
          <MenuItem>Log Out</MenuItem>
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
