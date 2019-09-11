import React from 'react';

const ONE_PASSWORD_BACKGROUND_COLOR = '#212b35';
const LINK_PROPS = {
  href: 'https://www.shopify.com/?ref=developer-3dfd5c56918d6397',
  target: '_blank',
};

export default () => {
  return (
    <>
      <div className="text">
        <p>I run my business on Shopify.</p>
        <p>Shopify is, hands down, the best eCommerce platform I've ever tried.</p>
        <p>
          - <a href="https://www.chrisesplin.com">Chris Esplin</a>, Calligraphy.org
        </p>
      </div>
      <a {...LINK_PROPS} className="banner" style={{ background: ONE_PASSWORD_BACKGROUND_COLOR }}>
        <img src="/images/advertisement/shopify/shopify_logo_darkbg.svg" alt="Shopify Banner" />
      </a>
      <a {...LINK_PROPS} className="cta" style={{ background: ONE_PASSWORD_BACKGROUND_COLOR }}>
        Try Shopify, Support HiiTClock.com
      </a>
    </>
  );
};
