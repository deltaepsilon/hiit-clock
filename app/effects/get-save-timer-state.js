/* global window */
import schema from '../components/schema';

export default function getSaveTimerState({ uid }) {
  const timerRef = uid && schema.getTimerStateRef(uid);

  return async ({ timer, state }) => {
    if (timerRef) {
      const changeSet = {};

      if (state) {
        changeSet.state = state;
      }

      if (timer) {
        changeSet.timer = timer;
      }

      return timerRef.update(changeSet);
    }
  };
}
