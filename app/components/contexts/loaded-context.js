/* globals window */
import React, { useState, useEffect } from 'react';

export const LoadedContext = React.createContext();

export default ({ children }) => {
  const documentReady = typeof window != 'undefined' && window.document.readyState == 'complete';
  const [loaded, setLoaded] = useState(documentReady);

  useEffect(() => {
    function onLoad() {
      setLoaded(true);
    }

    function subscribe() {
      if (documentReady) {
        onLoad();

        return () => {};
      } else {
        window.addEventListener('load', onLoad);

        return () => window.removeEventListener('load', onLoad);
      }
    }

    return loaded ? () => {} : subscribe();
  }, [loaded, documentReady]);

  return <LoadedContext.Provider value={loaded}>{children}</LoadedContext.Provider>;
};
