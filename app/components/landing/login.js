import React from 'react';
import { Button } from '@rmwc/button';
import '@material/button/dist/mdc.button.css';
import effects from '../../effects';

const buttonWrapperStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '6rem',
};

export default props => {
  return (
    <div style={buttonWrapperStyle}>
      <Button raised className="accent" onClick={effects.signInWithGoogle}>
        Login
      </Button>
      <Button raised onClick={effects.signInAnonymously}>
        Guest Mode
      </Button>
    </div>
  );
};
