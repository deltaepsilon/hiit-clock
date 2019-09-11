import React from 'react';
import ClickEventHandler from '../../analytics/click-event-handler';

const ONE_PASSWORD_BACKGROUND_COLOR = '#4d5d8c';
const LINK_PROPS = {
  href: 'https://www.1password.com',
  target: '_blank',
};
const ANALYTICS_EVENT_PROPS = {
  event: '1password-click',
};

export default () => {
  return (
    <>
      <div className="text">
        <p>I've used 1Password for years.</p>
        <p>1Password handles all of my web and app logins so I stay safe online.</p>
        <p>
          - <a href="https://www.chrisesplin.com">Chris Esplin</a>, HiiTClock.com
        </p>
      </div>
      <a {...LINK_PROPS} className="banner" style={{ background: ONE_PASSWORD_BACKGROUND_COLOR }}>
        <ClickEventHandler {...ANALYTICS_EVENT_PROPS}>
          <img
            src="/images/advertisement/one-password/dotcom-black-mono.svg"
            alt="1Password Banner"
          />
        </ClickEventHandler>
      </a>
      <a {...LINK_PROPS} className="cta" style={{ background: ONE_PASSWORD_BACKGROUND_COLOR }}>
        <ClickEventHandler {...ANALYTICS_EVENT_PROPS}>
          Try 1Password, Support HiiTClock.com
        </ClickEventHandler>
      </a>
    </>
  );
};
