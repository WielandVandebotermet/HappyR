const CACHE_NAME = 'HappyR-Cache-V9';
const CACHE_TTL = 24 * 60 * 60; // 1 day in seconds

self.addEventListener('push', event => {
  const data = event.data.json(); // Assuming the payload is in JSON format

  const options = {
    body: data.body,
    icon: "public\images\HappyR_Logo_Transparant.png",
    data: {
      url: data.link, // Customize the link to open when the notification is clicked
    },
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

self.addEventListener('notificationclick', event => {
  const notificationData = event.notification.data;

  if (notificationData.url) {
    clients.openWindow(notificationData.url);
  }

  event.notification.close();
});

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

  if (event.request.method === 'POST') {
    return;
  }

  event.respondWith(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.match(event.request)
          .then(cachedResponse => {
            const fetchPromise = fetch(event.request)
              .then(networkResponse => {
                // Cache the fetched response if it's a successful response and not a profile picture from Googleusercontent.com
                if (networkResponse.ok && requestUrl.hostname !== 'lh3.googleusercontent.com') {
                  cache.put(event.request, networkResponse.clone());
                }
                return networkResponse;
              })
              .catch(() => {
                // If fetch fails, return the cached response if available
                return cachedResponse || new Response(null, { status: 404, statusText: 'Not found' });
              });

            return cachedResponse || fetchPromise;
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
