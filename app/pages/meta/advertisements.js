import React, { useEffect, useState } from 'react';
import AppBase from '../../components/app/app-base';
import Advertisements from '../../components/page-components/meta/advertisements';
import parseSearch from '../../utilities/parse-search';

export default () => {
  const [index, setIndex] = useState(0);
  const search = typeof location != 'undefined' && location.search;

  useEffect(() => {
    if (search) {
      const { index } = parseSearch(search);

      setIndex(index);
    }
  }, [search]);

  return (
    <AppBase>
      <Advertisements index={index} />
    </AppBase>
  );
};
