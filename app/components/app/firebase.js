/* globals window */
import React from 'react';
import Head from 'next/head';

export default function Firebase() {
  return (
    <Head>
      <script src="https://www.gstatic.com/firebasejs/5.8.6/firebase-app.js" />
      <script src="https://www.gstatic.com/firebasejs/5.8.6/firebase-auth.js" />
      {/* <script src="https://www.gstatic.com/firebasejs/5.8.6/firebase-database.js" /> */}
      <script src="https://www.gstatic.com/firebasejs/5.8.6/firebase-firestore.js" />
      {/* <script src="https://www.gstatic.com/firebasejs/5.8.6/firebase-messaging.js" /> */}
      {/* <script src="https://www.gstatic.com/firebasejs/5.8.6/firebase-functions.js" /> */}
      />
      <script src="/__/firebase/init.js" />
    </Head>
  );
}
