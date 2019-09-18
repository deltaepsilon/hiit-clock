import React from "react";
import PhoneMock from "../../phone-mock/phone-mock";
import "./reddit-ads.css";

export default () => {
  return (
    <div id="reddit-ads">
      <h2>Reddit Ads</h2>

      <div className="grid">
        <div className="desktop ad">
          <PhoneMock>
            <img src="/images/screenshots/timer-play.png" alt="timer play" />
          </PhoneMock>
          <AdText />
        </div>
        <div className="mobile ad">
          <PhoneMock>
            <img src="/images/screenshots/timer-play.png" alt="timer play" />
          </PhoneMock>
          <AdText />
        </div>
      </div>

      <div className="grid">
        <PhoneMock>
          <img src="/images/screenshots/timer-detail.png" alt="timer detail" />
        </PhoneMock>
        <PhoneMock>
          <img
            src="/images/screenshots/timer-chromecast.png"
            alt="timer chromecast"
          />
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

function AdText() {
  return (
    <div className="text">
      <h3>HIITClock.com</h3>
      <p>Free workout timers</p>
      <p>Build your library</p>
    </div>
  );
}
