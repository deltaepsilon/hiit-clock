/* global window */
import debounceAsyncComplete from '../utilities/debounce-async-complete';
import schema from '../components/schema';

const debounceMillis = 1 * 1000;

export default debounceAsyncComplete(async function saveProfile(uid, profile) {
  const profileRef = schema.getProfileRef(uid);

  await profileRef.set(profile, { merge: true });

  return profile;
}, debounceMillis);
