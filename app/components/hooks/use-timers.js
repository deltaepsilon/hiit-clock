/* globals window */
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { AuthenticationContext } from '../contexts/authentication-context';
import constants from '../constants';
import schema from '../schema';

export default function useTimers() {
  const { currentUser } = useContext(AuthenticationContext);
  const [timers, setTimers] = useState({});
  const uid = useMemo(() => currentUser && currentUser.uid, [currentUser]);
  const updateLocalStorageTimers = useCallback(() => setLocalTimers(setTimers), [setTimers]);

  useEffect(() => {
    if (currentUser) {
      const unsubscribe = subscribe(currentUser, setTimers);

      window.addEventListener('storage', updateLocalStorageTimers);

      updateLocalStorageTimers();

      return () => {
        unsubscribe();
        window.removeEventListener('storage', updateLocalStorageTimers);
      };
    }
  }, [currentUser, setTimers, updateLocalStorageTimers]);

  return Object.keys(timers)
    .reduce((result, __id) => {
      result.push({ __id, uid, ...timers[__id] });

      return result;
    }, [])
    .sort((a, b) => (a.name > b.name ? 1 : -1));
}

function subscribe(currentUser = {}, setTimers) {
  const { uid } = currentUser;

  if (uid) {
    const userTimersRef = schema.getUserTimersRef(uid);

    return userTimersRef.onSnapshot(snapshot => {
      const dbTimers = snapshot.docs.reduce((result, doc) => {
        result[doc.id] = doc.data();

        return result;
      }, {});

      setTimers(existingTimers => ({ ...existingTimers, ...dbTimers }));
    });
  }
}

function setLocalTimers(setTimers) {
  const localTimersString = localStorage.getItem(constants.LOCALSTORAGE.TIMERS) || '{}';
  const localTimers = JSON.parse(localTimersString);

  setTimers(localTimers);
}
