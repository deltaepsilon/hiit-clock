import React, { useState, useEffect } from 'react';
import ChromecastBase from '../../components/app/chromecast-base';
import ChromecastPlay from '../../components/page-components/chromecast-play';
import parseSearch from '../../utilities/parse-search';
import constants from '../../components/constants';

export default () => {
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
    <ChromecastBase>
      <ChromecastPlay timerId={timerId} userId={userId} />
    </ChromecastBase>
  );
};
