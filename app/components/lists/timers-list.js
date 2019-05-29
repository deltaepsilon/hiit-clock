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
  const { local, search } = useSearch(items, searchTerm);
  const hasLocal = !!local.length;
  const hasSearch = !!search.length;

  return (
    <div className="timers-list list" has-local={String(hasLocal)} has-search={String(hasSearch)}>
      <SearchBar label={searchLabel} onChange={setSearchTerm} />
      <List className="list" twoLine>
        {local.map((timer, index) => (
          <TimerRow timer={timer} key={timer.__id} />
        ))}
        {search.length ? (
          <div className="interstitial">
            <span className="text-bold">Search Results</span>
          </div>
        ) : null}
        {search.map((timer, index) => (
          <TimerRow timer={timer} key={timer.objectID} />
        ))}
      </List>
    </div>
  );
};

function TimerRow({ timer }) {
  const href = `${constants.ROUTES.TIMER.DETAIL}?id=${timer.__id || timer.objectID}&userId=${
    timer.uid
  }`;

  return (
    <Link href={href}>
      <a href={href}>
        <SimpleListItem
          text={timer.name}
          secondaryText={<TotalTime periods={timer.periods} totalSeconds={timer.totalSeconds} />}
          metaIcon={<NavigateNextIcon fill={constants.COLORS.PRIMARY} />}
        />
      </a>
    </Link>
  );
}
