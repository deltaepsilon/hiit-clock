/* globals window */
import React from 'react';

export default ({ event = 'click', children }) => {
  return <div onClick={() => window.dataLayer.push({ event })}>{children}</div>;
};
