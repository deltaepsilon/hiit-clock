import React from 'react';
import calculateTimerTotalSeconds from '../../utilities/calculate-timer-total-seconds';

export default ({ timer }) => {
  const totalSeconds = calculateTimerTotalSeconds(timer);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const time = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return <span className="time">{time}</span>;
};
