/* globals window */
import { useState, useEffect } from 'react';
import constants from '../constants';
import schema from '../schema';

const defaultProfile = {
  username: '',
};

export default function useProfile(uid) {
  const [profile, setProfile] = useState(defaultProfile);

  useEffect(() => (uid ? subscribe(uid, setProfile) : () => {}), [uid]);

  return profile;
}

function subscribe(uid, setProfile) {
  const localProfileString = localStorage.getItem(constants.LOCALSTORAGE.PROFILE) || '{}';
  const localProfile = JSON.parse(localProfileString);
  const profileRef = schema.getProfileRef(uid);

  setProfile({ ...defaultProfile, localProfile });

  return profileRef.onSnapshot(doc => {
    const dbProfile = doc.data() || {};
    const dbProfileString = JSON.stringify(dbProfile);

    localStorage.setItem(constants.LOCALSTORAGE.PROFILE, dbProfileString);
    setProfile({ ...defaultProfile, ...dbProfile });
  });
}
