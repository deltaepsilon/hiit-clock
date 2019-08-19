import React from 'react';
import { Button } from '@rmwc/button';
import effects from '../../effects';
import './login.css';

const buttonWrapperStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  height: '100vh',
};

export default props => {
  return (
    <div id="login" style={buttonWrapperStyle}>
      <Button raised className="google" onClick={effects.signInWithGoogle}>
        Login with Google
      </Button>
      <div style={{ height: '1rem' }} />
      <Button raised className="facebook" onClick={effects.signInWithFacebook}>
        Login with Facebook
      </Button>
      <div style={{ height: '3rem' }} />
      <Button raised onClick={effects.signInAnonymously}>
        Guest Mode
      </Button>

      <p>
        Guests cannot upload images
        <br /> or share their timers.
      </p>
    </div>
  );
};
