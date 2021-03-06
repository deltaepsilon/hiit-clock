import React from 'react';
import ClickEventHandler from '../../analytics/click-event-handler';
import DisplayEventHandler from '../../analytics/display-event-handler';
import constants from '../../constants';

const BACKGROUND_IMAGE = 'linear-gradient(to right, #8f53d7, #4840bb, #4840bb, #09f)';
const LINK_PROPS = {
  href: 'https://www.wealthfront.com/c/affiliates/invited/AFFD-UXC1-MMN7-CETA',
  target: '_blank',
  rel: 'noopener noreferrer',
};
const ANALYTICS_EVENT_PROPS = {
  event: 'wealthfront-click',
  redditEvent: constants.REDDIT_EVENTS.LEAD,
};

export default () => {
  return (
    <>
      <DisplayEventHandler event="advertisement-wealthfront" />

      <div className="text">
        <p>I'm saving for my next big purchase with Wealthfront.</p>

        <p>Their rates are excellent and their website and mobile apps are top-notch.</p>

        <p>
          - <a href="https://www.chrisesplin.com" target="_blank" rel="noopener noreferrer">Chris Esplin</a>, HIITClock.com
        </p>
      </div>
      <a {...LINK_PROPS} className="banner" style={{ backgroundImage: BACKGROUND_IMAGE }}>
        <ClickEventHandler {...ANALYTICS_EVENT_PROPS}>
          <div className="advertising-banner">
            <img
              src="/images/advertisement/wealthfront/wave-circle.svg"
              alt="Wealthfront Banner"
              style={{ width: '300px' }}
            />
            <span>WEALTHFRONT</span>
          </div>
        </ClickEventHandler>
      </a>
      <a {...LINK_PROPS} className="cta" style={{ backgroundImage: BACKGROUND_IMAGE }}>
        <ClickEventHandler {...ANALYTICS_EVENT_PROPS}>
          Try Wealthfront, Support HIITClock.com
        </ClickEventHandler>
      </a>
    </>
  );
};
