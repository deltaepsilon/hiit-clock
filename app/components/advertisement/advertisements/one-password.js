import React from 'react';
import ClickEventHandler from '../../analytics/click-event-handler';
import DisplayEventHandler from '../../analytics/display-event-handler';
import constants from '../../constants';

const BACKGROUND_COLOR = '#4d5d8c';
const LINK_PROPS = {
  href: 'http://www.dpbolvw.net/click-9173008-13536585',
  target: '_blank',
  rel: 'noopener noreferrer',
};
const ANALYTICS_EVENT_PROPS = {
  event: '1password-click',
  redditEvent: constants.REDDIT_EVENTS.LEAD,
};

export default () => {
  return (
    <>
      <DisplayEventHandler event="advertisement-one-password" />

      <div className="text">
        <p>I've used 1Password for years.</p>
        <p>1Password handles all of my web and app logins so I stay safe online.</p>
        <p>
          - <a href="https://www.chrisesplin.com">Chris Esplin</a>, HIITClock.com
        </p>
      </div>
      <a {...LINK_PROPS} className="banner" style={{ background: BACKGROUND_COLOR }}>
        <ClickEventHandler {...ANALYTICS_EVENT_PROPS}>
          <img
            src="/images/advertisement/one-password/dotcom-black-mono.svg"
            alt="1Password Banner"
          />
        </ClickEventHandler>
      </a>
      <a {...LINK_PROPS} className="cta" style={{ background: BACKGROUND_COLOR }}>
        <ClickEventHandler {...ANALYTICS_EVENT_PROPS}>
          Try 1Password, Support HIITClock.com
        </ClickEventHandler>
      </a>
    </>
  );
};
