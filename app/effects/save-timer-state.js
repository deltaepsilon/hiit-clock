/* global window */
import schema from '../components/schema';

export default async function saveTimerState({ timer, state, userId }) {
  const changeSet = { state };

  if (timer) {
    changeSet.timer = timer;
  }

  return schema.getTimerStateRef(userId).update(changeSet);
}
