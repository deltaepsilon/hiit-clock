import React, { useEffect } from 'react';

export default () => {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js');
      });
    }
  });

  return null;
};
