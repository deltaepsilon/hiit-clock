import React, { useContext, useState } from 'react';
import { AuthenticationContext } from '../contexts/authentication-context';
import { ProfileContext } from '../contexts/profile-context';
import { SettingsContext } from '../contexts/settings-context';
import effects from '../../effects';

import { TextField } from '@rmwc/textfield';
import '@material/textfield/dist/mdc.textfield.css';
import '@material/floating-label/dist/mdc.floating-label.css';
import '@material/notched-outline/dist/mdc.notched-outline.css';
import '@material/line-ripple/dist/mdc.line-ripple.css';

import { Switch } from '@rmwc/switch';
import '@material/switch/dist/mdc.switch.css';
import '@material/form-field/dist/mdc.form-field.css';

import './settings.css';

export default props => {
  const { currentUser } = useContext(AuthenticationContext);
  const profile = useContext(ProfileContext);

  console.log('profile', profile);
  const settings = useContext(SettingsContext);
  const [username, setUsername] = useState(profile.username);

  console.log('currentUser', currentUser);

  return (
    <div id="settings">
      <form>
        <TextField
          outlined
          label="Username"
          helpText="Pick whatever you like!"
          value={username}
          onChange={async e => {
            const value = e.target.value;

            setUsername(value);

            const username = await effects.saveProfile(currentUser.uid, { username: value });

            setUsername(username);
          }}
          // disabled={!currentUser || currentUser.isAnonymous}
        />
        {currentUser && currentUser.isAnonymous && (
          <aside>Usernames are disabled in guest mode</aside>
        )}

        <hr />
        <Switch
          checked={!!settings.soundAlertsEnabled}
          onChange={e => console.log(e.target.checked)}
        >
          Sound Alerts
        </Switch>
        <Switch
          checked={!!settings.flashAlertsEnabled}
          onChange={e => console.log(e.target.checked)}
        >
          Flash Alerts
        </Switch>
      </form>
    </div>
  );
};
