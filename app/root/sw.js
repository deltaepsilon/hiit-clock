importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.0.0/workbox-sw.js');

const buildId = 'BUILD_ID';

workbox.setConfig({ debug: true });

console.info('installed with buildId:', buildId);

workbox.googleAnalytics.initialize({
  parameterOverrides: {
    cd1: 'offline',
  },
});

workbox.routing.registerRoute(
  new RegExp(/.*\.js/),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: `js-cache-${buildId}`,
  })
);

workbox.routing.registerRoute(
  new RegExp(/.*\.css/),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: `css-cache-${buildId}`,
  })
);

workbox.routing.registerRoute(
  new RegExp(/.*\.(?:png|jpg|jpeg|svg|gif|ico)/),
  new workbox.strategies.CacheFirst({
    cacheName: `image-cache-${buildId}`,
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 20,
        // Cache for a maximum of a week
        maxAgeSeconds: 7 * 24 * 60 * 60,
      }),
    ],
  })
);

workbox.routing.registerRoute(
  new RegExp('.*/$'),
  new workbox.strategies.CacheFirst({
    cacheName: `pages-cache-${buildId}`,
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 7 * 24 * 60 * 60,
      }),
    ],
  })
);

const originsToCache = new Set(['https://use.typekit.net', 'https://cdnjs.cloudflare.com']);

workbox.routing.registerRoute(function matchingFunction({ url, event }) {
  const isOriginToCache = originsToCache.has(url.origin);

  return isOriginToCache;
}, new workbox.strategies.StaleWhileRevalidate({ cacheName: `origins-cache-${buildId}` }));

self.addEventListener('install', event => {
  const promise = new Promise(async resolve => {
    const cacheKeys = await caches.keys();

    for (const name of cacheKeys) {
      console.info('deleting cache', name);
      caches.delete(name);
    }

    resolve();
  });

  event.waitUntil(promise);
});
