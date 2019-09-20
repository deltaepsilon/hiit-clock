import React, { useState, useEffect } from 'react';
import AppBase from '../components/app/app-base';
import TimerDetails from '../components/page-components/timer/timer-details';
import parseSearch from '../utilities/parse-search';
import constants from '../components/constants';

export default props => {
  const [timerId, setTimerId] = useState();
  const [userId, setUserId] = useState(constants.SHARED_USER);
  const search = typeof location != 'undefined' && location.search;

  useEffect(() => {
    if (search) {
      const { id, userId } = parseSearch(search);

      setTimerId(id);
      setUserId(userId || constants.SHARED_USER);
    }
  }, [search]);

  return (
    <AppBase>
      <TimerDetails timerId={timerId} userId={userId} />
    </AppBase>
  );
};
