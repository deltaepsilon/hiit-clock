import React from 'react';
import ClickEventHandler from '../analytics/click-event-handler';
import BackButton from '../top-bar/back-button';
import constants from '../constants';
import './support.css';

const LINK_DETAILS = {
  AMAZON_CHROMECAST: {
    BACKGROUND: 'linear-gradient(to right, #4285f4, #db4437, #f4b400, #0f9d58)',
    LINK_PROPS: {
      href:
        'https://www.amazon.com/s/ref=as_li_ss_tl?k=chromecast&ref=nb_sb_noss_2&linkCode=ll2&tag=calligraphyor-20&linkId=d75c93bc44807e9b4178b99fd97827eb&language=en_US',
      target: '_blank',
    },
    ANALYTICS_EVENT_PROPS: {
      event: 'chromecast-click',
    },
  },
  COINBASE: {
    BACKGROUND: '#0168bb',
    LINK_PROPS: {
      href: 'https://www.coinbase.com/join/cesplin',
      target: '_blank',
    },
    ANALYTICS_EVENT_PROPS: {
      event: 'coinbase-click',
    },
  },
  ONE_PASSWORD: {
    BACKGROUND: '#4d5d8c',
    LINK_PROPS: {
      href: 'http://www.dpbolvw.net/click-9173008-13536585',
      target: '_blank',
    },
    ANALYTICS_EVENT_PROPS: {
      event: '1password-click',
    },
  },
  SHOPIFY: {
    BACKGROUND: '#212b35',
    LINK_PROPS: {
      href: 'https://www.shopify.com/?ref=developer-3dfd5c56918d6397',
      target: '_blank',
    },
    ANALYTICS_EVENT_PROPS: {
      event: 'shopify-click',
    },
  },
  WEALTHFRONT: {
    BACKGROUND: 'linear-gradient(to right, #8f53d7, #4840bb, #4840bb, #09f)',
    LINK_PROPS: {
      href: 'https://www.wealthfront.com/c/affiliates/invited/AFFD-UXC1-MMN7-CETA',
      target: '_blank',
    },
    ANALYTICS_EVENT_PROPS: {
      event: 'wealthfront-click',
    },
  },
};

export default () => {
  return (
    <>
      <BackButton href={constants.ROUTES.DASHBOARD} />

      <div id="support">
        <h1>Support HIITClock.com</h1>

        <p>I've got a few affiliate relationships that help me keep the lights on.</p>

        <p>I only advertise for services that I use personally.</p>

        <p>Chris Esplin, HIITClock.com</p>

        <ul>
          <li>
            <a
              {...LINK_DETAILS.AMAZON_CHROMECAST.LINK_PROPS}
              className="banner"
              style={{ background: LINK_DETAILS.AMAZON_CHROMECAST.BACKGROUND }}
            >
              <ClickEventHandler {...LINK_DETAILS.AMAZON_CHROMECAST.ANALYTICS_EVENT_PROPS}>
                <img
                  src="/images/advertisement/amazon/chromecast.png"
                  alt="Chromecast Banner"
                  style={{ width: '300px' }}
                />
                <p>
                  HIIT Clock is built <br /> for Chromecast.
                </p>
              </ClickEventHandler>
            </a>
          </li>

          <li>
            <a
              {...LINK_DETAILS.WEALTHFRONT.LINK_PROPS}
              className="banner"
              style={{ background: LINK_DETAILS.WEALTHFRONT.BACKGROUND, padding: '1rem' }}
            >
              <ClickEventHandler {...LINK_DETAILS.WEALTHFRONT.ANALYTICS_EVENT_PROPS}>
                <img
                  src="/images/advertisement/wealthfront/wave-circle.svg"
                  alt="1Password Banner"
                  style={{ width: 200 }}
                />
                <span>WEALTHFRONT</span>
              </ClickEventHandler>
            </a>
          </li>

          <li>
            <a
              {...LINK_DETAILS.ONE_PASSWORD.LINK_PROPS}
              className="banner"
              style={{ background: LINK_DETAILS.ONE_PASSWORD.BACKGROUND, padding: '1rem' }}
            >
              <ClickEventHandler {...LINK_DETAILS.ONE_PASSWORD.ANALYTICS_EVENT_PROPS}>
                <img
                  src="/images/advertisement/one-password/dotcom-black-mono.svg"
                  alt="1Password Banner"
                />
              </ClickEventHandler>
            </a>
          </li>

          <li>
            <a
              {...LINK_DETAILS.COINBASE.LINK_PROPS}
              className="banner"
              style={{ background: LINK_DETAILS.COINBASE.BACKGROUND }}
            >
              <ClickEventHandler {...LINK_DETAILS.COINBASE.ANALYTICS_EVENT_PROPS}>
                <img
                  src="/images/advertisement/coinbase/coinbase-white.png"
                  alt="Coinbase Banner"
                  style={{ width: '300px' }}
                />
              </ClickEventHandler>
            </a>
          </li>

          <li>
            <a
              {...LINK_DETAILS.SHOPIFY.LINK_PROPS}
              className="banner"
              style={{ background: LINK_DETAILS.SHOPIFY.BACKGROUND, padding: '1rem' }}
            >
              <ClickEventHandler {...LINK_DETAILS.SHOPIFY.ANALYTICS_EVENT_PROPS}>
                <img
                  src="/images/advertisement/shopify/shopify_logo_darkbg.svg"
                  alt="Shopify Banner"
                />
              </ClickEventHandler>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};
