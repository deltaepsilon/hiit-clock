import React, { useContext } from 'react';
import { ProfileContext } from '../contexts/profile-context';
import { TextField } from '@rmwc/textfield';

import '@material/textfield/dist/mdc.textfield.css';
import '@material/floating-label/dist/mdc.floating-label.css';
import '@material/notched-outline/dist/mdc.notched-outline.css';
import '@material/line-ripple/dist/mdc.line-ripple.css';

import './profile.css';

const EMAIL_REGEX = `^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$`;
export default props => {
  const profile = useContext(ProfileContext);

  console.log('profile', profile);

  return (
    <div id="profile">
      <form>
        <TextField outlined label="name" helpText="What should we call you?" />
        <hr />
        <TextField
          outlined
          label="email"
          helpText={{
            validationMsg: true,
            children: "Want product updates? We'll need an email 😉",
          }}
          type="email"
          pattern={EMAIL_REGEX}
        />
      </form>
    </div>
  );
};
