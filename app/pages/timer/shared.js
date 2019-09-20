import React, { useState, useEffect } from 'react';
import ChromecastBase from '../../components/app/chromecast-base';
import ChromecastPlay from '../../components/page-components/timer/chromecast-play';
import BackButton from '../../components/top-bar/back-button';
import parseSearch from '../../utilities/parse-search';
import constants from '../../components/constants';

import './shared.css';

export default () => {
  const [timerId, setTimerId] = useState(null);
  const [shareId, setShareId] = useState(null);
  const [uid, setUid] = useState(constants.SHARED_USER);
  const search = typeof location != 'undefined' && location.search;

  useEffect(() => {
    if (search) {
      const { id, shareId, uid } = parseSearch(search);

      setTimerId(id);
      setShareId(shareId);
      setUid(uid || constants.SHARED_USER);
    }
  }, [search]);

  return (
    <ChromecastBase className="shared">
      <BackButton href={`${constants.ROUTES.TIMER.DETAIL}?id=${timerId}&userId=${uid}`} />
      <ChromecastPlay shareId={shareId} uid={uid} />
    </ChromecastBase>
  );
};
