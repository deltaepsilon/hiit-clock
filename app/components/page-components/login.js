import React from 'react';
import { Button } from '@rmwc/button';
import effects from '../../effects';

const buttonWrapperStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  height: '100vh',
};

export default props => {
  return (
    <div style={buttonWrapperStyle}>
      <Button raised className="accent" onClick={effects.signInWithGoogle}>
        Login
      </Button>
      <div style={{ height: '3rem' }} />
      <Button raised onClick={effects.signInAnonymously}>
        Guest Mode
      </Button>
    </div>
  );
};
