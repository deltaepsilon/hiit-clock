import React, { useContext } from 'react';
import Link from 'next/link';
import { Button } from '@rmwc/button';
import { List, SimpleListItem } from '@rmwc/list';
import { AuthenticationContext } from '../contexts/authentication-context';
import { Add, NavigateNext } from '../svg';
import DashboardOrLogin from '../top-bar/dashboard-or-login';
import constants from '../constants';

import '@material/list/dist/mdc.list.css';
import './landing.css';

const links = {
  powerlifting: `${constants.ROUTES.TIMER.DETAIL}?id=powerlifting-5x5&userId=${
    constants.SHARED_USER
  }`,
  tabata: `${constants.ROUTES.TIMER.DETAIL}?id=tabata-20-40&userId=${constants.SHARED_USER}`,
  emom: `${constants.ROUTES.TIMER.DETAIL}?id=emom-for-10-rounds&userId=${constants.SHARED_USER}`,
};

export default () => {
  const { currentUser } = useContext(AuthenticationContext);

  return (
    <>
      <DashboardOrLogin />

      <div id="landing">
        <h1>HiiT Clock</h1>

        <div className="user-actions">
          <Link href={constants.ROUTES.TIMER.CREATE}>
            <Button
              icon={<Add width={18} height={18} />}
              label="Create A Timer"
              raised
              tag="a"
              href={constants.ROUTES.CREATE}
            />
          </Link>
        </div>

        <section className="cta">
          <p>Browse popular timers 👇</p>
          <List>
            <Link href={constants.ROUTES.BROWSE.CROSSFIT}>
              <a href={constants.ROUTES.BROWSE.CROSSFIT}>
                <SimpleListItem
                  className="crossfit"
                  graphic="🏋"
                  text="Crossfit"
                  metaIcon={<NavigateNext />}
                />
              </a>
            </Link>
            <Link href={constants.ROUTES.BROWSE.POWERLIFTING}>
              <a href={constants.ROUTES.BROWSE.POWERLIFTING}>
                <SimpleListItem
                  className="powerlifting"
                  graphic="⚡"
                  text="Powerlifing"
                  metaIcon={<NavigateNext />}
                />
              </a>
            </Link>
            <Link href={constants.ROUTES.BROWSE.STRONGLIFTS}>
              <a href={constants.ROUTES.BROWSE.STRONGLIFTS}>
                <SimpleListItem
                  className="stronglifts"
                  graphic="💪"
                  text="Stronglifts"
                  metaIcon={<NavigateNext />}
                />
              </a>
            </Link>
            <Link href={constants.ROUTES.BROWSE.TABATA}>
              <a href={constants.ROUTES.BROWSE.TABATA}>
                <SimpleListItem
                  className="tabata"
                  graphic="⏰"
                  text="Tabata"
                  metaIcon={<NavigateNext />}
                />
              </a>
            </Link>
            <Link href={constants.ROUTES.BROWSE.CUSTOM}>
              <a href={constants.ROUTES.BROWSE.CUSTOM}>
                <SimpleListItem graphic="️️✏️" text="Custom" metaIcon={<NavigateNext />} />
              </a>
            </Link>
          </List>
        </section>

        <hr />

        <section>
          <h2>Optimized for Phones</h2>
          <p>HiiT Clock is meant for phones.</p>
          <p>Install HiiT Clock to your homescreen for Android.</p>
          <p>Navigate to HiiTClock.com in Safari on iOS.</p>
        </section>

        <hr />

        <section>
          <h2>Send to Chromecast</h2>
          <p>Cast to your TV using Chromecast</p>
          <p>Perfect for living rooms and personal gyms</p>
        </section>

        <hr />

        <section>
          <h2>Audio-only mode</h2>
          <p>Out for a run? Turn on audio queues and run HiiT Clock on your phone in your pocket</p>
        </section>

        <hr />

        <section>
          <h2>Quickstart workouts</h2>
          <p>
            We've seeded our database with common intervals and workouts from the health and fitness
            community
          </p>
        </section>

        <hr />

        <section>
          <h2>Contribute to the community</h2>
          <p>Share your custom intervals with the HiiT Clock community.</p>
          <p>Share with a link, or make your workouts publicly searchable.</p>
        </section>

        <hr />

        <section>
          <h2>Custom intervals</h2>
          <p>Create and save your custom workouts.</p>
          <p>Share workouts with friends or clients.</p>
          <p>Copy and modify existing workouts.</p>
        </section>
      </div>
    </>
  );
};
