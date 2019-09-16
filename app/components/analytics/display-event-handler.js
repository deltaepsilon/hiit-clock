/* globals window */
import React, { useEffect } from 'react';

export default ({ event = 'display' }) => {
  useEffect(() => {
    window.dataLayer.push({ event });
  }, [event]);

  return null;
};
