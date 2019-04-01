importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.0.0/workbox-sw.js');

const buildId = 'BUILD_ID';

workbox.setConfig({ debug: false });

console.info('installed with buildId:', buildId);

workbox.googleAnalytics.initialize({
  parameterOverrides: {
    cd1: 'offline',
  },
});

workbox.routing.registerRoute(
  new RegExp(/.*\.js/),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'js-cache',
  })
);

workbox.routing.registerRoute(
  new RegExp(/.*\.css/),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'css-cache',
  })
);

workbox.routing.registerRoute(
  new RegExp(/.*\.(?:png|jpg|jpeg|svg|gif)/),
  new workbox.strategies.CacheFirst({
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
