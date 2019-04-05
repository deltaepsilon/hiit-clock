import React from 'react';
import calculateTimerTotalSeconds from '../../utilities/calculate-timer-total-seconds';
import secondsToTime from '../../utilities/seconds-to-time';

export default ({ totalSeconds, periods }) => {
  const seconds = totalSeconds || calculateTimerTotalSeconds({ periods });
  const time = secondsToTime(seconds);

  return <span className="time">{time}</span>;
};
