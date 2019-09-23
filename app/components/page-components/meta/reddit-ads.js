import React from 'react';
import PhoneMock from '../../phone-mock/phone-mock';
import './reddit-ads.css';

export default () => {
  return (
    <div id="reddit-ads">
      <h2>Reddit Ads</h2>

      <div className="grid">
        <div className="desktop ad">
          <PhoneMock src="/images/screenshots/timer-detail-low.png" />
          <PhoneMock src="/images/screenshots/timer-play.png" />
          <PhoneMock src="/images/screenshots/timer-search.png" />
        </div>

        <div className="desktop ad">
          <PhoneMock src="/images/screenshots/kettlebell-list.png" />
          <PhoneMock src="/images/screenshots/kettlebell-01.png" />
          <PhoneMock src="/images/screenshots/kettlebell-playing.png" />
        </div>

        <div className="desktop ad">
          <PhoneMock src="/images/screenshots/flexibility-list.png" />
          <PhoneMock src="/images/screenshots/flexibility-middle-splits.png" />
          <PhoneMock src="/images/screenshots/flexibility-playing.png" />
        </div>

        <div className="desktop ad">
          <PhoneMock src="/images/screenshots/fitness-blender-list.png" />
          <PhoneMock src="/images/screenshots/fitness-blender-brutal-hiit-ladder.png" />
          <PhoneMock src="/images/screenshots/fitness-blender-playing.png" />
        </div>

        <div className="desktop ad">
          <PhoneMock src="/images/screenshots/timer-detail.png" />
          <PhoneMock src="/images/screenshots/timer-play.png" />
          <PhoneMock src="/images/screenshots/timer-chromecast.png" />
        </div>

        <div className="desktop ad">
          <PhoneMock src="/images/screenshots/timer-search.png" />
          <PhoneMock src="/images/screenshots/timer-play.png" />
          <PhoneMock src="/images/screenshots/timer-share.png" />
        </div>

        <div className="desktop ad">
          <PhoneMock src="/images/screenshots/timer-search.png" />
          <PhoneMock src="/images/screenshots/timer-edit-move.png" />
          <PhoneMock src="/images/screenshots/timer-play.png" />
        </div>

        <div className="desktop ad">
          <PhoneMock src="/images/screenshots/timer-search.png" />
          <PhoneMock src="/images/screenshots/timer-edit-with-image.png" />
          <PhoneMock src="/images/screenshots/timer-play.png" />
        </div>

        <div className="mobile ad">
          <PhoneMock src="/images/screenshots/timer-search.png" />
          <PhoneMock src="/images/screenshots/timer-play.png" />
        </div>

        <div className="mobile ad">
          <PhoneMock src="/images/screenshots/timer-search.png" />
          <PhoneMock src="/images/screenshots/timer-play.png" />
        </div>
      </div>

      <div className="grid">
        <div className="desktop ad">
          <PhoneMock src="/images/screenshots/timer-detail.png" />

          <AdText />
        </div>
        <div className="mobile ad">
          <PhoneMock src="/images/screenshots/timer-play.png" />

          <AdText />
        </div>
      </div>

      <div className="grid">
        <PhoneMock src="/images/screenshots/timer-chromecast.png" />
        <PhoneMock src="/images/screenshots/timer-detail-low.png" />
        <PhoneMock src="/images/screenshots/timer-detail.png" />
        <PhoneMock src="/images/screenshots/timer-edit-empty.png" />
        <PhoneMock src="/images/screenshots/timer-edit-move.png" />
        <PhoneMock src="/images/screenshots/timer-edit-with-image.png" />
        <PhoneMock src="/images/screenshots/timer-edit.png" />
        <PhoneMock src="/images/screenshots/timer-media.png" />
        <PhoneMock src="/images/screenshots/timer-play.png" />
        <PhoneMock src="/images/screenshots/timer-search.png" />
        <PhoneMock src="/images/screenshots/timer-share.png" />
      </div>
    </div>
  );
};

function AdText() {
  return (
    <div className="text">
      <h3>HIITClock.com</h3>
      <p>Free workout timers</p>
      <p>Build your library</p>
    </div>
  );
}
