/* globals window */
import React from 'react';
import useRedditTrack from '../hooks/use-reddit-track';

export default ({ event = 'click', redditEvent, children }) => {
  const redditTrack = useRedditTrack();

  return (
    <div
      onClick={() => {
        window.dataLayer.push({ event });

        redditEvent && redditTrack(redditEvent);
      }}
    >
      {children}
    </div>
  );
};
