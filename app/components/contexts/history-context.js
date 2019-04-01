/* globals window */
import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import constants from '../constants';

export const HistoryContext = React.createContext();

export default ({ children }) => {
  const [urlHistory, setUrlHistory] = useState(getUrlHistory());

  useEffect(() => {
    return Router.beforePopState(({ url, as, options }) => {
      const urlHistory = getUrlHistory();
      const update = urlHistory.slice(0, urlHistory.length - 1);

      setUrlHistory(update);
      saveUrlHistory(update);

      return true;
    });
  }, [Router]);

  useEffect(() => {
    function handleRouteChangeComplete(url) {
      const urlHistory = getUrlHistory();
      const hasChanged = url != urlHistory[urlHistory.length - 1];

      console.log('urlHistory', urlHistory);

      if (hasChanged) {
        const update = urlHistory.concat(url);

        setUrlHistory(update);
        saveUrlHistory(update);
      }
    }

    Router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => Router.events.off('routeChangeComplete', handleRouteChangeComplete);
  }, [Router]);

  useEffect(() => {
    const urlHistory = getUrlHistory();
    const url = getUrl();
    const lastEntryIsDuplicate = url == urlHistory[urlHistory.length - 1];

    if (lastEntryIsDuplicate) {
      const update = urlHistory.slice(0, urlHistory.length - 1);

      setUrlHistory(update);
      saveUrlHistory(update);
    }

    return () => {};
  }, [Router]);

  return <HistoryContext.Provider value={{ urlHistory }}>{children}</HistoryContext.Provider>;
};

function getUrl() {
  return `${window.location.pathname}${window.location.search}`;
}

function getUrlHistory() {
  const localUrlHistoryString = localStorage.getItem(constants.LOCALSTORAGE.URL_HISTORY);
  const url = getUrl();

  if (!localUrlHistoryString) {
    saveUrlHistory([url]);
  }

  return localUrlHistoryString ? JSON.parse(localUrlHistoryString) : [url];
}

function saveUrlHistory(urlHistory) {
  const urlHistoryString = JSON.stringify(urlHistory);

  localStorage.setItem(constants.LOCALSTORAGE.URL_HISTORY, urlHistoryString);
}
