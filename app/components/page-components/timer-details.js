import React from 'react';
import useTimer from '../hooks/use-timer';

export default ({ timerId }) => {
  const timer = useTimer(timerId);

  console.log('timer', timer);
  
  return (
    <>
      <h1>Timer Details</h1>
    </>
  );
};
