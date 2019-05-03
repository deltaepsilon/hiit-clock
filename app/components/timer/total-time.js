import React from 'react';
import calculateTimerTotalSeconds from '../../utilities/calculate-timer-total-seconds';
import secondsToTime from '../../utilities/seconds-to-time';

export default React.memo(({ totalSeconds, periods }) => {
  const seconds =
    typeof totalSeconds == 'undefined' ? calculateTimerTotalSeconds({ periods }) : totalSeconds;
  const time = secondsToTime(seconds);

  return <span className="time">{time}</span>;
});
