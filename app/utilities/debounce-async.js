export default (fn, millis = 0) => {
  let isWaiting;

  return async (...args) =>
    new Promise(async resolve => {
      if (!isWaiting) {
        isWaiting = true;

        setTimeout(async () => (isWaiting = false), millis);

        resolve(await fn.apply(this, args));
      } else {
        resolve();
      }
    });
};
