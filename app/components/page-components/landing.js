import React from 'react';
import Link from 'next/link';
import { Button } from '@rmwc/button';
import NavigateNextIcon from '../svg/navigate-next';

import '@material/button/dist/mdc.button.css';
import './landing.css';

export default props => {
  return (
    <div id="landing">
      <h1>HiiT Clock</h1>
      <section className="cta">
        <ul>
          <li>
            <Link href="/browse/crossfit">
              <Button raised className="crossfit">
                <span>🏋</span>
                <span>Crossfit</span>
                <span>
                  <NavigateNextIcon />
                </span>
              </Button>
            </Link>
          </li>
          <li>
            <Link href="/browse/powerlifting">
              <Button raised className="powerlifting">
                <span>⚡</span>
                <span>Powerlifting</span>
                <span>
                  <NavigateNextIcon />
                </span>
              </Button>
            </Link>
          </li>
          <li>
            <Link href="/browse/stronglifts">
              <Button raised className="stronglifts">
                <span>💪</span>
                <span>Stronglifts</span>
                <span>
                  <NavigateNextIcon />
                </span>
              </Button>
            </Link>
          </li>
          <li>
            <Link href="/browse/tabata">
              <Button raised className="tabata">
                <span>⏰</span>
                <span>tabata</span>
                <span>
                  <NavigateNextIcon />
                </span>
              </Button>
            </Link>
          </li>
          <li>
            <Link href="/browse/custom">
              <Button raised>
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
      
      <hr/>

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
