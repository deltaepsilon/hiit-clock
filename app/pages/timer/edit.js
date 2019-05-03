import React, { useState, useEffect } from 'react';
import AppBase from '../../components/app/app-base';
import TimerEdit from '../../components/page-components/timer-edit';
import parseSearch from '../../utilities/parse-search';

export default props => {
  const [timerId, setTimerId] = useState();

  useEffect(() => {
    const { id } = parseSearch(location.search);

    setTimerId(id);
  }, [location.search]);

  return (
    <AppBase topBar>
      <TimerEdit timerId={timerId} />
    </AppBase>
  );
};
