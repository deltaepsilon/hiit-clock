import React, { useCallback, useContext, useState } from 'react';
import Link from 'next/link';
import { List, SimpleListItem } from '@rmwc/list';
import { AuthenticationContext } from '../contexts/authentication-context';
import { NavigateNext, People, Person } from '../svg';
import TouchEvents from '../touch-events/touch-events';
import TotalTime from '../timer/total-time';
import TimerModal from '../modals/timer-modal';
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
        {local.map(timer => (
          <TimerRow timer={timer} key={timer.__id} />
        ))}
        {search.length ? (
          <div className="interstitial">
            <span className="text-bold">Search</span>
          </div>
        ) : null}
        {search.map(timer => (
          <TimerRow timer={timer} key={timer.objectID} isSearch />
        ))}
      </List>
    </div>
  );
};

function TimerRow({ timer, isSearch }) {
  const { currentUser } = useContext(AuthenticationContext);
  const [showModal, setShowModal] = useState(false);
  const handleSwipe = useCallback(() => !isSearch && !!currentUser && setShowModal(true), [
    isSearch,
    currentUser,
    setShowModal,
  ]);
  const href = `${constants.ROUTES.TIMER.DETAIL}?id=${timer.__id || timer.objectID}&userId=${
    timer.uid
  }`;
  const isShared = timer.uid == constants.SHARED_USER;
  let graphic = undefined;

  if (isSearch) {
  } else if (isShared) {
    graphic = <People fill={constants.COLORS.PRIMARY_LIGHT} />;
  } else {
    graphic = <Person fill={constants.COLORS.PRIMARY_LIGHT} />;
  }

  return (
    <>
      {showModal && <TimerModal timerId={timer.__id} onClose={() => setShowModal(false)} />}
      <Link href={href}>
        <a href={href}>
          <TouchEvents onRightSwipe={handleSwipe} onLeftSwipe={handleSwipe}>
            <SimpleListItem
              text={timer.name}
              secondaryText={
                <TotalTime periods={timer.periods} totalSeconds={timer.totalSeconds} />
              }
              graphic={graphic}
              metaIcon={<NavigateNext fill={constants.COLORS.PRIMARY} />}
            />
          </TouchEvents>
        </a>
      </Link>
    </>
  );
}
