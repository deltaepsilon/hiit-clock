import React from 'react';
import ClickEventHandler from '../../analytics/click-event-handler';
import DisplayEventHandler from '../../analytics/display-event-handler';

const BACKGROUND_COLOR = '#0168bb';
const LINK_PROPS = {
  href: 'https://www.coinbase.com/join/cesplin',
  target: '_blank',
};
const ANALYTICS_EVENT_PROPS = {
  event: 'coinbase-click',
};

export default () => {
  return (
    <>
      <DisplayEventHandler event="advertisement-coinbase" />

      <div className="text">
        <p>I use Coinbase for all of my crypto.</p>

        <p>
          - <a href="https://www.chrisesplin.com">Chris Esplin</a>, HIITClock.com
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
