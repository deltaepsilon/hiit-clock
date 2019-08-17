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
          <h2>Where's the old HiiT Clock?</h2>
          <p>
            You can find the original HiiT Clock at{' '}
            <a href="https://v1.hiitclock.com">https://v1.hiitclock.com</a>
          </p>
          <p>The original app isn't aging very well, so it was time for a full rewrite.</p>
          <p>
            The new app has slightly different functionality and a new look. You're welcome to use
            the old app as long as you like, but it's no longer supported 😭
          </p>
          <p>The upside is that I can maintain and add features to the new HiiT Clock!</p>
          <p>
            <a href="https://www.chrisesplin.com">Chris Esplin</a>
            <br />
            <a href="mailto:chris@hiitclock.com?subject=Hey%20Chris!&body=I've%20got%20some%20questions%2Fcomments%20about%20HiiTClock.com...">
              chris@hiitclock.com
            </a>
            <img
              style={{ marginTop: '1rem' }}
              src="https://storage.googleapis.com/quiver-four.appspot.com/howtofirebase%2F640%2Findia-portrait.JPG?GoogleAccessId=firebase-adminsdk-z45et%40quiver-four.iam.gserviceaccount.com&Expires=2177452800&Signature=EfkdiC7tCn2Z%2FcFi%2BrR%2FsY3b6kwHHJ3SUl5%2FHj%2Fb1eHnAhf8HOZKbWrjMaRkA5DcIL7NsPJwRUF8m17qttKqGqzPQNdWjEQ2l%2BtPImqc02OszxgVrUaL50929so0nEKdbhLcz5ATmWrB%2FQ81CBr%2FJsQqnHnJNmikc4eOuRe%2BjSBFtVoamnF18ks%2BQK%2FVM5rFDC7v1zat9SZ5xzrLpT3b0EwWpWT7XOBUpWzC3FQwJCM50g9bg%2FF5xsg3SssVDcBSjm28CFJDVk9pXpxoEEbTNBOu2yl%2BJKMh83KE3Fo8mj%2B0WHmNPXGE274l%2F7YdACCg8y%2FX%2FA1D7XWV1wycpyM9ZA%3D%3D"
              alt="Chris Esplin at a conference"
            />
          </p>
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
