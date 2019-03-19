import { useEffect } from 'react';

export default (cb, inputEl = null) => {
  const inputId = inputEl ? inputEl.id : null;

  function handleFocus() {
    window.addEventListener('keyup', cb);
  }

  function handleBlur() {
    window.removeEventListener('keyup', cb);
  }

  useEffect(() => {
    if (inputEl) {
      inputEl.addEventListener('focus', handleFocus);
      inputEl.addEventListener('blur', handleBlur);
    }

    return () => {
      if (inputEl) {
        inputEl.removeEventListener('focus', handleFocus);
        inputEl.removeEventListener('blur', handleBlur);
      }
    };
  }, [inputId]);
};
