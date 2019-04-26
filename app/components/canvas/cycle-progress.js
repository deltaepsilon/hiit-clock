import React from 'react';

export default ({ timer, cycles, secondsElapsed }) => {
  return (
    <>
      <h1>{timer.name}</h1>
      <p>{cycles.length}</p>
      <span>{secondsElapsed}</span>
    </>
  );
};
