/* globals window */
import React, { useEffect, useState } from 'react';
import Head from 'next/head';

/**
 * Instructions: https://firebase.google.com/docs/perf-mon/get-started-web#cdn_standard-sdk
 * Polyfill: https://github.com/GoogleChromeLabs/first-input-delay
 */
export default function FirebasePerformance() {
  const [perf, setPerf] = useState(null);

  useEffect(() => {
    if (typeof window != 'undefined') {
      const perf = window.firebase.performance();

      setPerf(perf);
    }
  }, []);

  return (
    <Head>
      <script
        dangerouslySetInnerHTML={{
          __html: `
              !function(n,e){var t,o,i,c=[],f={passive:!0,capture:!0},r=new Date,a="pointerup",u="pointercancel";function p(n,c){t||(t=c,o=n,i=new Date,w(e),s())}function s(){o>=0&&o<i-r&&(c.forEach(function(n){n(o,t)}),c=[])}function l(t){if(t.cancelable){var o=(t.timeStamp>1e12?new Date:performance.now())-t.timeStamp;"pointerdown"==t.type?function(t,o){function i(){p(t,o),r()}function c(){r()}function r(){e(a,i,f),e(u,c,f)}n(a,i,f),n(u,c,f)}(o,t):p(o,t)}}function w(n){["click","mousedown","keydown","touchstart","pointerdown"].forEach(function(e){n(e,l,f)})}w(n),self.perfMetrics=self.perfMetrics||{},self.perfMetrics.onFirstInputDelay=function(n){c.push(n),s()}}(addEventListener,removeEventListener);
              `,
        }}
      />
    </Head>
  );
}
