import React from 'react';
import secondsToTime from '../../utilities/seconds-to-time';

export default ({ period, minimal }) => {
  const time = secondsToTime(period.totalSeconds, minimal);

  return <span className="time">{time}</span>;
};
