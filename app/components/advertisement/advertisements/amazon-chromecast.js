import React from 'react';
import ClickEventHandler from '../../analytics/click-event-handler';
import DisplayEventHandler from '../../analytics/display-event-handler';

const BACKGROUND_IMAGE = 'linear-gradient(to right, #4285f4, #db4437, #f4b400, #0f9d58)';
const LINK_PROPS = {
  href:
    'https://www.amazon.com/s/ref=as_li_ss_tl?k=chromecast&ref=nb_sb_noss_2&linkCode=ll2&tag=calligraphyor-20&linkId=d75c93bc44807e9b4178b99fd97827eb&language=en_US',
  target: '_blank',
  rel: 'noopener noreferrer',
};
const ANALYTICS_EVENT_PROPS = {
  event: 'chromecast-click',
};

export default () => {
  return (
    <>
      <DisplayEventHandler event="advertisement-chromecast" />

      <div className="text">
        <p>Google Chromecast is a perfect complement to HIIT Clock.</p>

        <p>Cast your workout timers up to the big screen.</p>
      </div>
      <a {...LINK_PROPS} className="banner" style={{ backgroundImage: BACKGROUND_IMAGE }}>
        <ClickEventHandler {...ANALYTICS_EVENT_PROPS}>
          <div className="advertising-banner">
            <img
              src="/images/advertisement/amazon/chromecast.png"
              alt="Chromecast Banner"
              style={{ width: '300px' }}
            />
            <span>Chromecast</span>
          </div>
        </ClickEventHandler>
      </a>
      <a {...LINK_PROPS} className="cta" style={{ backgroundImage: BACKGROUND_IMAGE }}>
        <ClickEventHandler {...ANALYTICS_EVENT_PROPS}>
          Try Chromecast, Support HIITClock.com
        </ClickEventHandler>
      </a>
    </>
  );
};
