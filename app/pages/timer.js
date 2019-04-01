import React, { useState, useEffect } from 'react';
import AppBase from '../components/app/app-base';
import TimerDetails from '../components/page-components/timer-details';
import parseSearch from '../utilities/parse-search';

export default props => {
  const [timerId, setTimerId] = useState();

  useEffect(() => {
    const { id } = parseSearch(location.search);

    setTimerId(id);
  }, [location.search]);

  return (
    <AppBase topBar>
      <TimerDetails timerId={timerId} />
    </AppBase>
  );
};
