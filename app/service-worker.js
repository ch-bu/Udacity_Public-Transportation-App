// Constat for name of service worker
var STATICCACHENAME = 'transportation-v2';

/**
 * Listen for install event of service worker
 */
self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open(STATICCACHENAME).then(function(cache) {
        return cache.addAll([
          '/index.html',
          '/styles/materialize.css',
          'images/waiting.png',
          'images/crow_fly.png',
          'images/public_transport.png',
          'images/street_network.png',
          'images/walking.png',
          '/styles/main.css',
          '/scripts/main.js',
          'https://fonts.googleapis.com/icon?family=Material+Icons',
          'fonts/roboto/Roboto-Regular.woff',
          'fonts/roboto/Roboto-Regular.woff2',
          'fonts/roboto/Roboto-Regular.ttf',
          'fonts/roboto/Roboto-Bold.woff',
          'fonts/roboto/Roboto-Bold.woff2',
          'fonts/roboto/Roboto-Bold.ttf',
        ]);
      })
    );
});

/**
 * Listen for fetch events
 */
self.addEventListener('fetch', function(event) {

    event.respondWith(
      caches.match(event.request).then(function(response) {
        if (response) return response;

        return fetch(event.request);
      })
    );
});

/**
 * Listen for active of service worker
 */
self.addEventListener('activate', function(event) {
    // Remove old service workers
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
          return Promise.all(
            cacheNames.filter(function(cacheName) {
              return cacheName.startsWith('transportation-') &&
                     cacheName != STATICCACHENAME;
            }).map(function(cacheName) {
              return caches.delete(cacheName);
            })
          );
        })
    );
});