import React, { useState } from 'react';
import Link from 'next/link';
import { List, SimpleListItem } from '@rmwc/list';
import NavigateNextIcon from '../svg/navigate-next';
import TotalTime from '../timer/total-time';
import SearchBar from './search-bar';
import constants from '../constants';
import useSearch from '../hooks/use-search';

import '@material/list/dist/mdc.list.css';
import './lists.css';

export default ({ searchLabel, items }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const timers = useSearch(items, searchTerm);

  return (
    <div className="timers-list list">
      <SearchBar label={searchLabel} onChange={setSearchTerm} />
      <List className="list" twoLine>
        {timers.map(timer => (
          <Link key={timer.id} href={`/timer/${timer.id}`}>
            <SimpleListItem
              text={timer.name}
              secondaryText={<TotalTime timer={timer} />}
              metaIcon={<NavigateNextIcon fill={constants.COLORS.PRIMARY} />}
            />
          </Link>
        ))}
      </List>
    </div>
  );
};
