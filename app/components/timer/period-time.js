import React from 'react';
import secondsToTime from '../../utilities/seconds-to-time';

export default ({ period }) => {
  const time = secondsToTime(period.totalSeconds);

  return <span className="time">{time}</span>;
};
