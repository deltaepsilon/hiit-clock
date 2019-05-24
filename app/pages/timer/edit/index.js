import React, { useState, useEffect } from 'react';
import AppBase from '../../../components/app/app-base';
import TimerEdit from '../../../components/page-components/timer-edit';
import parseSearch from '../../../utilities/parse-search';

export default () => {
  const [timerId, setTimerId] = useState();
  const [userId, setUserId] = useState();
  const [isOwned, setIsOwned] = useState(false);

  useEffect(() => {
    const { id, userId, isOwned: isOwnedString } = parseSearch(location.search);
    const isOwned = isOwnedString == 'true';

    setTimerId(id);
    setUserId(userId);
    setIsOwned(isOwned);
  }, [location.search]);

  return (
    <AppBase>
      <TimerEdit timerId={timerId} userId={userId} isOwned={isOwned} />
    </AppBase>
  );
};
