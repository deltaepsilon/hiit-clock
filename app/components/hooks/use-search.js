/* globals window */
import { useEffect, useMemo, useState } from 'react';
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
  }, [items]);

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
    if (index) {
      index.search({ query: searchTerm }, (err, content) => {
        if (err) {
          console.info('algolia timers search error', err);
        } else {
          setSearchResults(content.hits);
        }
      });
    }
  }, [isSearchingAlgolia, index, searchTerm]);

  const { local, search } = useMemo(() => {
    const local = getFuseResult({ fuse, searchTerm, items });
    const localIds = new Set(local.map(({ __id }) => __id));
    const search = searchResults.filter(({ objectID }) => !localIds.has(objectID));

    return { local, search };
  }, [fuse, items, searchResults, searchTerm]);

  return { local, search };
};

function getFuseResult({ fuse, searchTerm, items }) {
  const result = searchTerm ? fuse.search(searchTerm) : items;
  const sorted = result.sort((a, b) =>
    !a.lastAccessed || a.lastAccessed < b.lastAccessed ? 1 : -1
  );

  return sorted;
}
