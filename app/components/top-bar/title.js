import React from 'react';
import ReactDOM from 'react-dom';

import constants from '../constants';

export default React.memo(({ children, ...props }) => {
  const el = window.document.querySelector('#title');

  return ReactDOM.createPortal(<Title {...props}>{children}</Title>, el);
});

function Title({ children, large }) {
  const className = large ? 'large' : '';

  return <h1 className={className}>{children}</h1>;
}
