import React from 'react';
import ReactDOM from 'react-dom';

export default React.memo(({ children }) => {
  const el = window.document.querySelector('#timer-data');

  return ReactDOM.createPortal(<>{children}</>, el);
});
