import { useContext, useEffect } from 'react';
import { AuthenticationContext } from '../contexts/authentication-context';
import useSettings from '../hooks/use-settings';
import effects from '../../effects';

export default () => {
  const { currentUser } = useContext(AuthenticationContext);
  const settings = useSettings();

  useEffect(() => {
    if (currentUser && settings) {
      const { uid } = currentUser;
      const saveTimerState = effects.getSaveTimerState({ uid });

      (async () => {
        await saveTimerState({ settings });
      })();
    }
  }, [currentUser, settings]);

  return null;
};
