import React from 'react';
import PhoneMock from '../../phone-mock/phone-mock';
import screenshots from '../../../public/images/screenshots/screenshots.json';
import './screenshots.css';

export default () => {
  return (
    <div id="screenshots">
      <h2>Screenshots</h2>

      <div className="grid">
        {screenshots.map(filename => (
          <PhoneMock
            key={filename}
            src={`/images/screenshots/${filename}`}
            alt="timer chromecast"
          />
        ))}
      </div>
    </div>
  );
};
