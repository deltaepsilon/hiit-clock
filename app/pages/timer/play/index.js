import React, { useState, useEffect } from 'react';
import AppBase from '../../../components/app/app-base';
import TimerPlay from '../../../components/page-components/timer-play';
import parseSearch from '../../../utilities/parse-search';
import constants from '../../../components/constants';

export default props => {
  const [timerId, setTimerId] = useState();
  const [userId, setUserId] = useState(constants.SHARED_USER);

  useEffect(() => {
    const { id, userId } = parseSearch(location.search);

    setTimerId(id);
    setUserId(userId || constants.SHARED_USER);
  }, [location.search]);

  return (
    <AppBase>
      <TimerPlay timerId={timerId} userId={userId} />
    </AppBase>
  );
};
