/* global window */
import schema from '../components/schema';

export default function getSaveTimerState({ uid }) {
  const timerRef = uid && schema.getTimerStateRef(uid);

  return async ({ settings, state, timer }) => {
    if (timerRef) {
      const changeSet = {};

      if (settings) {
        changeSet.settings = settings;
      }

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
