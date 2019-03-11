import React from 'react';
import { Button } from '@rmwc/button';
import '@material/button/dist/mdc.button.css';
import effects from '../../effects';

console.log('effects', effects);

const buttonWrapperStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '6rem',
};

export default props => {
  return (
    <div style={buttonWrapperStyle}>
      <Button raised className="accent">
        Login
      </Button>
      <Button raised onClick={effects.logInAnonymously}>
        Guest Mode
      </Button>
    </div>
  );
};
