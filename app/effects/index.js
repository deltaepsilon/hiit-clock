/* globals window */
import signInAnonymously from './sign-in-anonymously';
import signInWithGoogle from './sign-in-with-google';

export default {
  signInAnonymously: wrapEffect(signInAnonymously),
  signInWithGoogle: wrapEffect(signInWithGoogle),
};

function wrapEffect(effect) {
  const isDev = window.environment.environment == 'development';
  const name = effect.name;

  return async (...args) => {
    try {
      isDev && console.time && console.time(name);

      await effect(...args);

      isDev && console.time && console.timeEnd(name);
    } catch (error) {
      console.info(`${name} effect failed!`);
      console.error(error);
    }
  };
}
