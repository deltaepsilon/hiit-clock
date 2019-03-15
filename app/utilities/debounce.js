export default (fn, millis = 0) => {
  let timer;

  return (...args) => {
    clearTimeout(timer);

    timer = setTimeout(async () => fn.apply(this, args), millis);
  };
};
