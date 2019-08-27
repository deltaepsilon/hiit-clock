import React, { useContext, useEffect, useState } from 'react';
import { AuthenticationContext } from '../contexts/authentication-context';
import { ProfileContext } from '../contexts/profile-context';
import { SettingsContext } from '../contexts/settings-context';
import BackButton from '../top-bar/back-button';
import effects from '../../effects';
import constants from '../constants';

import { TextField } from '@rmwc/textfield';
import { Switch } from '@rmwc/switch';
import { Button } from '@rmwc/button';
import { Radio } from '@rmwc/radio';

import './settings.css';

export default () => {
  const { currentUser, updateCurrentUser } = useContext(AuthenticationContext);
  const profile = useContext(ProfileContext);
  const settings = useContext(SettingsContext);
  const [username, setUsername] = useState(profile.username);

  useEffect(() => setUsername(profile.username), [profile.username]);

  const isAnonymous = !currentUser || currentUser.isAnonymous;

  return (
    <div id="settings">
      <BackButton href={constants.ROUTES.DASHBOARD} />

      <form>
        {isAnonymous ? (
          <div>
            <Button
              raised
              onClick={async e => {
                e.preventDefault();
                e.stopPropagation();

                await effects.linkToGoogle();

                updateCurrentUser();
              }}
            >
              Log In With Google
            </Button>

            <p>Link your guest session to a Google account to save timers across devices.</p>
          </div>
        ) : (
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
          />
        )}

        <hr />
        <Switch
          className="switch"
          checked={!!settings.soundAlertsEnabled}
          onChange={e => effects.saveSettings({ soundAlertsEnabled: e.target.checked })}
        >
          Sound Alerts
        </Switch>
        <Switch
          className="switch"
          checked={!!settings.flashAlertsEnabled}
          onChange={e => effects.saveSettings({ flashAlertsEnabled: e.target.checked })}
        >
          Flash Alerts
        </Switch>

        <hr />

        <h3>Sound Selection</h3>
        {constants.SOUNDS.map(({ name }, i) => {
          return (
            <Radio
              key={name}
              className="radio-button"
              value={i}
              checked={i == settings.soundIndex}
              onChange={() => effects.saveSettings({ soundIndex: i })}
            >
              {name}
            </Radio>
          );
        })}
      </form>
    </div>
  );
};
