import React, { useState } from 'react';
import Link from 'next/link';
import { List, SimpleListItem } from '@rmwc/list';
import NavigateNextIcon from '../svg/navigate-next';
import TotalTime from '../timer/total-time';
import SearchBar from './search-bar';
import useSearch from '../hooks/use-search';
import constants from '../constants';

import './lists.css';

export default ({ searchLabel, items }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const timers = useSearch(items, searchTerm);

  return (
    <div className="timers-list list">
      <SearchBar label={searchLabel} onChange={setSearchTerm} />
      <List className="list" twoLine>
        {timers.map((timer, i) => {
          const href = `${constants.ROUTES.TIMER.DETAIL}?id=${timer.__id ||
            timer.objectID}&userId=${timer.uid}`;
          const key = `${timer.__id || timer.objectID}-${i}`;

          return (
            <Link key={key} href={href}>
              <a href={href}>
                <SimpleListItem
                  text={timer.name}
                  secondaryText={<TotalTime periods={timer.periods} />}
                  metaIcon={<NavigateNextIcon fill={constants.COLORS.PRIMARY} />}
                />
              </a>
            </Link>
          );
        })}
      </List>
    </div>
  );
};
