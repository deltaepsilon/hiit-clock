import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

export default class CustomDocument extends Document {
  render() {
    return (
      <html lang="en">
        <Head>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
          />
          <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
          <link rel="icon" href="/images/favicon.ico" />
          <link rel="manifest" href="/manifest.json" />
          <script src="https://www.gstatic.com/firebasejs/6.4.0/firebase-app.js" />
          <script src="https://www.gstatic.com/firebasejs/6.4.0/firebase-auth.js" />
          <script src="https://www.gstatic.com/firebasejs/6.4.0/firebase-firestore.js" />
          <script src="https://www.gstatic.com/firebasejs/6.4.0/firebase-storage.js" />
          <script src="https://www.gstatic.com/firebasejs/6.4.0/firebase-database.js" />
          <script src="https://www.gstatic.com/firebasejs/6.4.0/firebase-performance.js" />
          {/* <script src="https://fireperffw.firebaseapp.com/v003/firebase-performance-standalone.js" /> */}
          {/* <script src="https://www.gstatic.com/firebasejs/6.4.0/firebase-messaging.js" /> */}
          {/* <script src="https://www.gstatic.com/firebasejs/6.4.0/firebase-functions.js" /> */}
          <script src="/__/firebase/init.js" defer />
          <script src="https://cdnjs.cloudflare.com/ajax/libs/algoliasearch/3.32.1/algoliasearchLite.min.js" />

          <script
            dangerouslySetInnerHTML={{
              __html: `
                if (typeof window != 'undefined') {
                  window.__onGCastApiAvailable = function(isAvailable) {
                    if (isAvailable) {
                      window.initializeCastApi();
                    }
                  };
                }
              `,
            }}
          />
        </Head>
        <body>
          <div id="top-bar">
            <div id="logo" />
            <div id="back-button" />
            <div id="title" />
            <div id="user-menu" />
            <div id="timer-data" />
            <audio id="chime" src="/sounds/double-chime.mp3" />
          </div>
          <div id="modal" />
          <Main />
          <NextScript />
          <noscript>
            <p>Please enable JavaScript to use HiiT Clock.</p>
            <p>Email chris@chrisesplin.com with questions.</p>
          </noscript>
        </body>
      </html>
    );
  }
}
