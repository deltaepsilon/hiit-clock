import React from 'react';
import ReactDOM from 'react-dom';

export default React.memo(({ children, ...props }) => {
  const el = window.document.querySelector('#title');

  return ReactDOM.createPortal(<Title {...props}>{children}</Title>, el);
});

function Title({ children, large, ...props }) {
  const className = large ? 'large' : '';

  return (
    <h1 className={className} {...props}>
      {children}
    </h1>
  );
}
