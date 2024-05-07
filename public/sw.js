const CACHE_NAME = 'HappyR-Cache-V3';
const CACHE_TTL = 24 * 60 * 60; // 1 day in seconds

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll([
          // No need to specify individual URLs here
        ]);
      })
  );
});
self.addEventListener('fetch', event => {
    const requestUrl = new URL(event.request.url);
  
    // Exclude specific URLs from caching
    if (requestUrl.hostname === 'lh3.googleusercontent.com') {
      // Skip caching for profile pictures hosted on Googleusercontent.com
      return;
    }
  
    event.respondWith(
      caches.open(CACHE_NAME)
        .then(cache => {
          return cache.match(event.request)
            .then(response => {
              if (response) {
                return response;
              }
  
              return fetch(event.request)
                .then(networkResponse => {
                  // Cache only if not a profile picture from Googleusercontent.com
                  if (requestUrl.hostname !== 'lh3.googleusercontent.com') {
                    cache.put(event.request, networkResponse.clone());
                  }
                  return networkResponse;
                });
            });
        })
    );
  });
  

self.addEventListener('activate', event => {
  const currentCaches = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (!currentCaches.includes(cache)) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});