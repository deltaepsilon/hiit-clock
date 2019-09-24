import React from 'react';
import ClickEventHandler from '../../analytics/click-event-handler';
import DisplayEventHandler from '../../analytics/display-event-handler';

const BACKGROUND_COLOR = '#212b35';
const LINK_PROPS = {
  href: 'https://www.shopify.com/?ref=developer-3dfd5c56918d6397',
  target: '_blank',
  rel: 'noopener noreferrer',
};
const ANALYTICS_EVENT_PROPS = {
  event: 'shopify-click',
};

export default () => {
  return (
    <>
      <DisplayEventHandler event="advertisement-shopify" />

      <div className="text">
        <p>I run my business on Shopify.</p>
        <p>Shopify is, hands down, the best eCommerce platform I've ever tried.</p>
        <p>
          - <a href="https://www.chrisesplin.com">Chris Esplin</a>, Calligraphy.org
        </p>
      </div>
      <a {...LINK_PROPS} className="banner" style={{ background: BACKGROUND_COLOR }}>
        <ClickEventHandler {...ANALYTICS_EVENT_PROPS}>
          <img src="/images/advertisement/shopify/shopify_logo_darkbg.svg" alt="Shopify Banner" />
        </ClickEventHandler>
      </a>
      <a {...LINK_PROPS} className="cta" style={{ background: BACKGROUND_COLOR }}>
        <ClickEventHandler {...ANALYTICS_EVENT_PROPS}>
          Try Shopify, Support HIITClock.com
        </ClickEventHandler>
      </a>
    </>
  );
};
