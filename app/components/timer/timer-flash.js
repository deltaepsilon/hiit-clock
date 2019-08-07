import React, { useContext, useEffect, useState } from 'react';
import useSettings from '../hooks/use-settings';
import { SecondsContext } from '../contexts/timer-context';
import constants from '../constants';
import './timer-flash.css';

export default () => {
  const { periodStats } = useContext(SecondsContext);
  const { flashAlertsEnabled } = useSettings();
  const [showingFlash, setShowingFlash] = useState(false);

  useEffect(() => {
    if (flashAlertsEnabled) {
      const { remainder } = periodStats;
      const isTheRightSecond = remainder == constants.TIMES.REMAINDER_SECONDS_TO_ALERT;

      if (isTheRightSecond) {
        setShowingFlash(true);

        setTimeout(() => setShowingFlash(false), constants.TIMES.FLASH_SECONDS * 1000);
      }
    }
  }, [flashAlertsEnabled, periodStats, setShowingFlash]);

  return showingFlash ? <div id="flash" /> : null;
};
