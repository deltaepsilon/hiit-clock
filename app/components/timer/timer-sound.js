import { useContext, useEffect } from 'react';
import { SecondsContext } from '../contexts/timer-context';
import useSettings from '../hooks/use-settings';
import useSound from '../hooks/use-sound';
import constants from '../constants';

export default () => {
  const { periodStats } = useContext(SecondsContext);
  const { soundAlertsEnabled } = useSettings();
  const { playChime } = useSound();

  useEffect(() => {
    if (soundAlertsEnabled) {
      const { remainder } = periodStats;
      const isTheRightSecond = remainder == constants.TIMES.REMAINDER_SECONDS_TO_ALERT;

      if (isTheRightSecond) {
        playChime();
      }
    }
  }, [playChime, periodStats, soundAlertsEnabled]);

  return null;
};
