import React from 'react';
import ClickEventHandler from '../../analytics/click-event-handler';
import DisplayEventHandler from '../../analytics/display-event-handler';
import constants from '../../constants';

const BACKGROUND_COLOR = '#ffffff';
const LINK_PROPS = {
  href: 'https://joinhoney.com/ref/hwe2zkt',
  target: '_blank',
  rel: 'noopener noreferrer',
};
const ANALYTICS_EVENT_PROPS = {
  event: 'honey-click',
  redditEvent: constants.REDDIT_EVENTS.LEAD,
};

export default () => {
  return (
    <>
      <DisplayEventHandler event="advertisement-honey" />

      <div className="text">
        <p>Honey is FREE.</p>
        <p>I use honey to always get the best price when shopping online.</p>
        <p>
          - <a href="https://www.chrisesplin.com" target="_blank" rel="noopener noreferrer">Chris Esplin</a>, HIITClock.com
        </p>
      </div>
      <a {...LINK_PROPS} className="banner" style={{ background: BACKGROUND_COLOR }}>
        <ClickEventHandler {...ANALYTICS_EVENT_PROPS}>
          <img
            src="/images/advertisement/honey/logo-orange.svg"
            alt="Honey Banner"
            style={{ width: '80vw', maxWidth: 600 }}
          />
        </ClickEventHandler>
      </a>
      <a {...LINK_PROPS} className="cta" style={{ background: BACKGROUND_COLOR, color: 'black' }}>
        <ClickEventHandler {...ANALYTICS_EVENT_PROPS}>
          Try Honey, Support HIITClock.com
        </ClickEventHandler>
      </a>
    </>
  );
};
