var staticCacheName = 'transportation-v1';

/**
 * @param  {[type]}
 * @return {[type]}
 */
self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open(staticCacheName).then(function(cache) {
        return cache.addAll([
          '/skeleton.html',
          '/styles/materialize.css',
          'images/waiting.png',
          'images/crow_fly.png',
          'images/public_transport.png',
          'images/street_network.png',
          'images/walking.png',
          '/styles/main.css',
          '/scripts/main.min.js',
          'https://fonts.googleapis.com/icon?family=Material+Icons',
          'fonts/roboto/Roboto-Regular.woff',
          'fonts/roboto/Roboto-Regular.woff2',
          'fonts/roboto/Roboto-Regular.ttf'
        ]);
      })
    );
});

self.addEventListener('fetch', function(event) {

    var requestUrl = new URL(event.request.url);

    if (requestUrl.origin === location.origin) {

      if (requestUrl.pathname === '/') {

        event.respondWith(caches.match('/skeleton.html'));
        return;
      }
    }

    event.respondWith(
      caches.match(event.request).then(function(response) {
        if (response) return response;
        return fetch(event.request);
      })
    );
});

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
          return Promise.all(
            cacheNames.filter(function(cacheName) {
              return cacheName.startsWith('transportation-') &&
                     cacheName != staticCacheName;
            }).map(function(cacheName) {
              return caches.delete(cacheName);
            })
          );
        })
    );
});