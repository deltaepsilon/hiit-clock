import React, { useContext } from 'react';
import Link from 'next/link';
import { Button } from '@rmwc/button';
import { IconButton } from '@rmwc/icon-button';
import NavigateNextIcon from '../svg/navigate-next';
import { AuthenticationContext } from '../contexts/authentication-context';
import { AddCircleOutline, Dashboard, PlayCircleOutline } from '../svg';
import constants from '../constants';

import './landing.css';

const links = {
  powerlifting: `${constants.ROUTES.TIMER.DETAIL}?id=powerlifting-5x5`,
  tabata: `${constants.ROUTES.TIMER.DETAIL}?id=tabata-20-40`,
  emom: `${constants.ROUTES.TIMER.DETAIL}?id=emom-for-10-rounds`,
};

export default props => {
  const { currentUser } = useContext(AuthenticationContext);
  const showCreate = true;
  const showLogin = !currentUser || true;
  const showDashboard = !!currentUser || true;
  const loginButtonHref = !currentUser ? constants.ROUTES.LOGIN : constants.ROUTES.DASHBOARD;

  return (
    <div id="landing">
      <h1>HiiT Clock</h1>
      <p>Create your own timer</p>
      <div className="user-actions">
        {showDashboard && (
          <Link href={constants.ROUTES.DASHBOARD}>
            <Button
              icon={<Dashboard width={18} height={18} />}
              label="Dashboard"
              raised
              tag="a"
              href={constants.ROUTES.DASHBOARD}
            />
          </Link>
        )}
        {showCreate && (
          <Link href={constants.ROUTES.TIMER.CREATE}>
            <Button
              icon={<AddCircleOutline width={18} height={18} />}
              label="Create A Timer"
              raised
              tag="a"
              href={constants.ROUTES.TIMER.CREATE}
            />
          </Link>
        )}
        {showLogin && (
          <Link href={loginButtonHref}>
            <Button
              icon={<PlayCircleOutline width={18} height={18} />}
              label="Login"
              raised
              tag="a"
              href={loginButtonHref}
            />
          </Link>
        )}
      </div>
      <section>
        <h2>Popular Timers</h2>

        <Link href={links.powerlifting}>
          <Button
            icon={<PlayCircleOutline width={18} height={18} />}
            label="Powerlifting 5x5"
            raised
            tag="a"
            href={links.powerlifting}
          />
        </Link>

        <Link href={links.tabata}>
          <Button
            icon={<PlayCircleOutline width={18} height={18} />}
            label="Tabata 20/40"
            raised
            tag="a"
            href={links.tabata}
          />
        </Link>

        <Link href={links.emom}>
          <Button
            icon={<PlayCircleOutline width={18} height={18} />}
            label="10m EMOM"
            raised
            tag="a"
            href={links.emom}
          />
        </Link>
      </section>
      <section className="cta">
        <ul>
          <li>
            <Link href={constants.ROUTES.BROWSE.CROSSFIT}>
              <Button raised tag="a" href={constants.ROUTES.BROWSE.CROSSFIT} className="crossfit">
                <span>🏋</span>
                <span>Crossfit</span>
                <span>
                  <NavigateNextIcon />
                </span>
              </Button>
            </Link>
          </li>
          <li>
            <Link href={constants.ROUTES.BROWSE.POWERLIFTING}>
              <Button
                raised
                tag="a"
                href={constants.ROUTES.BROWSE.POWERLIFTING}
                className="powerlifting"
              >
                <span>⚡</span>
                <span>Powerlifting</span>
                <span>
                  <NavigateNextIcon />
                </span>
              </Button>
            </Link>
          </li>
          <li>
            <Link href={constants.ROUTES.BROWSE.STRONGLIFTS}>
              <Button
                raised
                tag="a"
                href={constants.ROUTES.BROWSE.STRONGLIFTS}
                className="stronglifts"
              >
                <span>💪</span>
                <span>Stronglifts</span>
                <span>
                  <NavigateNextIcon />
                </span>
              </Button>
            </Link>
          </li>
          <li>
            <Link href={constants.ROUTES.BROWSE.TABATA}>
              <Button raised tag="a" href={constants.ROUTES.BROWSE.TABATA} className="tabata">
                <span>⏰</span>
                <span>tabata</span>
                <span>
                  <NavigateNextIcon />
                </span>
              </Button>
            </Link>
          </li>
          <li>
            <Link href={constants.ROUTES.BROWSE.CUSTOM}>
              <Button raised tag="a" href={constants.ROUTES.BROWSE.CUSTOM} className="custom">
                <span>✏️</span>
                <span>Custom</span>
                <span>
                  <NavigateNextIcon />
                </span>
              </Button>
            </Link>
          </li>
        </ul>
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
  );
};
