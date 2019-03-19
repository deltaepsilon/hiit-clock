import { useState, useEffect } from 'react';
import Fuse from 'fuse.js';

const fuseOptions = {
  keys: [
    { name: 'name', weight: 0.7 },
    { name: 'tags', weight: 0.5 },
    { name: 'description', weight: 0.3 },
  ],
};

export default (items, searchTerm) => {
  const [fuse, setFuse] = useState(null);

  useEffect(() => {
    items ? setFuse(new Fuse(items, fuseOptions)) : setFuse(null);
  }, items);

  function getFuseResult() {
    return searchTerm ? fuse.search(searchTerm) : items;
  }

  return fuse ? getFuseResult() : [];
};
