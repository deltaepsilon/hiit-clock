if (typeof firebase === 'undefined')
  throw new Error(
    'hosting/init-error: Firebase SDK not detected. You must include it before /__/firebase/init.js'
  );
firebase.initializeApp({
  apiKey: 'AIzaSyBfRz6m6sTQgWwyYflE16swTrBy5N3A-_g',
  appId: '1:699614023089:web:439e292cf7bbdea0',
  databaseURL: 'https://quiver-hiit-clock.firebaseio.com',
  storageBucket: 'quiver-hiit-clock.appspot.com',
  authDomain: 'quiver-hiit-clock.firebaseapp.com',
  messagingSenderId: '699614023089',
  projectId: 'quiver-hiit-clock',
});
