/* global window */
import schema from '../components/schema';

export default function getSaveTimerState({ uid }) {
  const timerRef = uid && schema.getTimerStateRef(uid);
  let laggedState = {};

  return async ({ timer, state }) => {
    if (timerRef) {
      const changeSet = {};
      let hasChanged = false;

      if (state) {
        const playStateChanged =
          state.playState != laggedState.playState || state.timeStarted != laggedState.timeStarted;

        if (playStateChanged) {
          changeSet.state = state;
          hasChanged = true;
        }

        laggedState = state;
      }

      if (timer) {
        changeSet.timer = timer;
        hasChanged = true;
      }

      return hasChanged && timerRef.update(changeSet);
    }
  };
}
