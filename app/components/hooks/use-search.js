/* globals window */
import { useState, useEffect } from 'react';
import Fuse from 'fuse.js';
import constants from '../constants';

const fuseOptions = {
  keys: [
    { name: 'name', weight: 0.7 },
    { name: 'tags', weight: 0.5 },
    { name: 'description', weight: 0.3 },
  ],
};

export default (items, searchTerm) => {
  const [index, setIndex] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [fuse, setFuse] = useState(null);
  const isSearchingAlgolia = !items;

  useEffect(() => {
    items ? setFuse(new Fuse(items, fuseOptions)) : setFuse(null);
  }, items);

  useEffect(() => {
    const isBrowser = typeof window != 'undefined';
    const algoliasearch = isBrowser && window.algoliasearch;
    const environment = isBrowser && window.environment;
    const client =
      environment && algoliasearch(environment.algolia.applicationId, environment.algolia.apiKey);
    const index = client && client.initIndex(constants.ALGOLIA.INDICES.TIMERS);

    setIndex(index);
  }, [window, window.environment]);

  useEffect(() => {
    if (isSearchingAlgolia && index) {
      index.search({ query: searchTerm }, (err, content) => {
        if (err) {
          console.info('algolia timers search error', err);
        } else {
          setSearchResults(content.hits);
        }
      });
    }
  }, [isSearchingAlgolia, index, searchTerm]);

  function getFuseResult() {
    return searchTerm ? fuse.search(searchTerm) : items;
  }

  return fuse ? getFuseResult() : searchResults;
};
