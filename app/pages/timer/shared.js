import React, { useState, useEffect } from 'react';
import ChromecastBase from '../../components/app/chromecast-base';
import ChromecastPlay from '../../components/page-components/chromecast-play';
import parseSearch from '../../utilities/parse-search';
import constants from '../../components/constants';

import './shared.css';

export default () => {
  const [shareId, setShareId] = useState(null);
  const [uid, setUid] = useState(constants.SHARED_USER);
  const search = typeof location != 'undefined' && location.search;

  useEffect(() => {
    if (search) {
      const { shareId, uid } = parseSearch(search);

      setShareId(shareId);
      setUid(uid || constants.SHARED_USER);
    }
  }, [search]);

  return (
    <ChromecastBase>
      <ChromecastPlay shareId={shareId} uid={uid} />
    </ChromecastBase>
  );
};
