import React, { useEffect, useMemo, useState } from 'react';
import { IconButton } from '@rmwc/icon-button';
import { Close } from '../svg';
import useAdvertisement from '../hooks/use-advertisement';
import useRedditTrack from '../hooks/use-reddit-track';
import advertisements from './advertisements';
import constants from '../constants';

import './advertisement.css';

export default React.memo(
  ({ show }) => {
    const redditTrack = useRedditTrack();
    const { counter } = useAdvertisement();
    const [isDismissed, setIsDismissed] = useState(false);
    const AdvertisementBody = useMemo(() => {
      const index = !counter ? 0 : counter % advertisements.length;

      return advertisements[index];
    }, [counter]);

    useEffect(() => {
      setIsDismissed(false);
    }, [setIsDismissed, show]);

    useEffect(() => {
      redditTrack(constants.REDDIT_EVENTS.VIEW_CONTENT);
    }, []);

    return show && !isDismissed ? (
      <div id="advertisement">
        <div className="dismiss" onClick={() => setIsDismissed(true)}>
          <IconButton icon={<Close />} />
        </div>
        <div className="body">
          <AdvertisementBody />
        </div>
      </div>
    ) : null;
  },
  (prevProps, nextProps) => {
    const showEqual = prevProps.show == nextProps.show;

    return showEqual;
  }
);
