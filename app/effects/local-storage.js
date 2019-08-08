/* globals window */
const storage = typeof window != 'undefined' ? localStorage : {};

export default {
  ...storage,
  getItem: (...args) => storage.getItem(...args),
  setItem: (...args) => {
    storage.setItem(...args);
    window.dispatchEvent(new Event('storage'));
  },
};
