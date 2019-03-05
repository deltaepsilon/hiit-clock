importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.0.0/workbox-sw.js');

workbox.routing.registerRoute(
  /.*\.js/,
  workbox.strategies.StaleWhileRevalidate({
    cacheName: 'js-cache',
  })
);

workbox.routing.registerRoute(
  /.*\.css/,
  workbox.strategies.StaleWhileRevalidate({
    cacheName: 'css-cache',
  })
);

workbox.routing.registerRoute(
  /.*\.(?:png|jpg|jpeg|svg|gif)/,
  workbox.strategies.CacheFirst({
    cacheName: 'image-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 20,
        // Cache for a maximum of a week
        maxAgeSeconds: 7 * 24 * 60 * 60,
      }),
    ],
  })
);
