/* globals window */
import deleteTimer from './delete-timer';
import linkToGoogle from './link-to-google';
import localStorage from './local-storage';
import saveProfile from './save-profile';
import saveSettings from './save-settings';
import saveTimerForm from './save-timer-form';
import saveTimerState from './save-timer-state';
import saveTimer from './save-timer';
import signInAnonymously from './sign-in-anonymously';
import signInWithGoogle from './sign-in-with-google';
import signOut from './sign-out';

export default {
  deleteTimer: wrapEffect(deleteTimer),
  localStorage,
  linkToGoogle: wrapEffect(linkToGoogle),
  saveProfile: wrapEffect(saveProfile),
  saveSettings: wrapEffect(saveSettings),
  saveTimerForm: wrapEffect(saveTimerForm),
  saveTimerState: wrapEffect(saveTimerState),
  saveTimer: wrapEffect(saveTimer),
  signInAnonymously: wrapEffect(signInAnonymously),
  signInWithGoogle: wrapEffect(signInWithGoogle),
  signOut: wrapEffect(signOut),
};

function wrapEffect(effect) {
  const isDev =
    typeof window != 'undefined' &&
    window.environment &&
    window.environment.environment == 'development';
  const name = effect.name;

  return async (...args) => {
    try {
      isDev && console.time && console.time(name);

      await effect(...args);

      isDev && console.time && console.timeEnd(name);
    } catch (error) {
      console.info(`${name} effect failed!`);
      console.error(error);

      if (typeof window.handleEffectError == 'function') {
        window.handleEffectError(error);
      }
    }
  };
}
