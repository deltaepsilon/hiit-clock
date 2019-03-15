/* global window */
import debounceAsync from '../utilities/debounce-async';
import schema from '../components/schema';

const debounceMillis = 1 * 1000;

export default debounceAsync(async function saveProfile(uid, profile) {
  const profileRef = schema.getProfileRef(uid);

  await profileRef.set(profile, { merge: true });

  return profile;
}, debounceMillis);
