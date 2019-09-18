import React from 'react';
import PhoneMock from '../../phone-mock/phone-mock';
import './screenshots.css';

export default () => {
  return (
    <div id="screenshots">
      <h2>Screenshots</h2>

      <div className="grid">
        <PhoneMock>
          <img src="/images/screenshots/timer-chromecast.png" alt="timer chromecast" />
        </PhoneMock>
        <PhoneMock>
          <img src="/images/screenshots/timer-detail.png" alt="timer detail" />
        </PhoneMock>
        <PhoneMock>
          <img src="/images/screenshots/timer-play.png" alt="timer play" />
        </PhoneMock>
        <PhoneMock>
          <img src="/images/screenshots/timer-share.png" alt="timer share" />
        </PhoneMock>
      </div>
    </div>
  );
};
