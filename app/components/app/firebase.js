/* globals window */
import React from 'react';
import Head from 'next/head';

export default function Firebase() {
  return (
    <Head>
      <script src="https://www.gstatic.com/firebasejs/5.9.0/firebase-app.js" />
      <script src="https://www.gstatic.com/firebasejs/5.9.0/firebase-auth.js" />
      <script src="https://www.gstatic.com/firebasejs/5.9.0/firebase-firestore.js" />
      {/* <script src="https://www.gstatic.com/firebasejs/5.9.0/firebase-database.js" /> */}
      {/* <script src="https://www.gstatic.com/firebasejs/5.9.0/firebase-messaging.js" /> */}
      {/* <script src="https://www.gstatic.com/firebasejs/5.9.0/firebase-functions.js" /> */}
      {/* <script src="https://www.gstatic.com/firebasejs/5.9.0/firebase-storage.js" /> */}

      <script src="/__/firebase/init.js" defer />
    </Head>
  );
}
