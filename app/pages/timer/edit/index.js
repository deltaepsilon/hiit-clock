import React, { useState, useEffect } from 'react';
import AppBase from '../../../components/app/app-base';
import TimerEdit from '../../../components/page-components/timer-edit';
import parseSearch from '../../../utilities/parse-search';

export default () => {
  const [timerId, setTimerId] = useState();
  const [userId, setUserId] = useState();

  useEffect(() => {
    const { id, userId } = parseSearch(location.search);

    setTimerId(id);
    setUserId(userId);
  }, [location.search]);

  return (
    <AppBase>
      <TimerEdit timerId={timerId} userId={userId} />
    </AppBase>
  );
};
