import React from 'react';
import ClickEventHandler from '../../analytics/click-event-handler';
import DisplayEventHandler from '../../analytics/display-event-handler';
import constants from '../../constants';

const BACKGROUND_COLOR = '#0168bb';
const LINK_PROPS = {
  href: 'https://www.coinbase.com/join/cesplin',
  target: '_blank',
  rel: 'noopener noreferrer',
};
const ANALYTICS_EVENT_PROPS = {
  event: 'coinbase-click',
  redditEvent: constants.REDDIT_EVENTS.LEAD,
};

export default () => {
  return (
    <>
      <DisplayEventHandler event="advertisement-coinbase" />

      <div className="text">
        <p>I use Coinbase for all of my crypto.</p>

        <p>
          - <a href="https://www.chrisesplin.com" target="_blank" rel="noopener noreferrer">Chris Esplin</a>, HIITClock.com
        </p>
      </div>
      <a {...LINK_PROPS} className="banner" style={{ background: BACKGROUND_COLOR }}>
        <ClickEventHandler {...ANALYTICS_EVENT_PROPS}>
          <img
            src="/images/advertisement/coinbase/coinbase-white.png"
            alt="Coinbase Banner"
            style={{ height: 200 }}
          />
        </ClickEventHandler>
      </a>
      <a {...LINK_PROPS} className="cta" style={{ background: BACKGROUND_COLOR }}>
        <ClickEventHandler {...ANALYTICS_EVENT_PROPS}>
          Try Coinbase, Support HIITClock.com
        </ClickEventHandler>
      </a>
    </>
  );
};
