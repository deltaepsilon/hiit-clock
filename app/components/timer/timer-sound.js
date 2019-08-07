import React, { useContext, useEffect, useRef } from 'react';
import useSettings from '../hooks/use-settings';
import { SecondsContext } from '../contexts/timer-context';
import constants from '../constants';

export default ({ filename = 'double-chime.mp3' }) => {
  const { periodStats } = useContext(SecondsContext);
  const { soundAlertsEnabled } = useSettings();
  const audioRef = useRef(null);

  useEffect(() => {
    if (soundAlertsEnabled) {
      const { remainder } = periodStats;
      const isTheRightSecond = remainder == constants.TIMES.REMAINDER_SECONDS_TO_ALERT;

      if (isTheRightSecond) {
        const audioEl = audioRef.current;

        (async () => {
          await audioEl.play();
        })();
      }
    }
  }, [audioRef, periodStats, soundAlertsEnabled]);

  return soundAlertsEnabled ? <audio ref={audioRef} src={`/sounds/${filename}`} /> : null;
};
