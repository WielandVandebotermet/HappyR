// Define the name of the cache
const CACHE_NAME = 'HappyR-Cache-V10';

// Define the cache time-to-live (TTL) in seconds (1 day)
const CACHE_TTL = 24 * 60 * 60; // 1 day in seconds

/**
 * Event listener for 'push' events.
 * This will handle incoming push notifications and display them.
 */
self.addEventListener('push', event => {
  const data = event.data.json(); // Assuming the payload is in JSON format

  // Define the notification options
  const options = {
    body: data.body,
    icon: "public/images/HappyR_Logo_Transparant.png",
    data: {
      url: data.link, // Link to open when the notification is clicked
    },
  };

  // Display the notification
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

/**
 * Event listener for 'notificationclick' events.
 * This will handle actions when a notification is clicked.
 */
self.addEventListener('notificationclick', event => {
  const notificationData = event.notification.data;

  // Open the URL specified in the notification data
  if (notificationData.url) {
    clients.openWindow(notificationData.url);
  }

  // Close the notification
  event.notification.close();
});

/**
 * Event listener for 'install' events.
 * This will handle the service worker installation and cache setup.
 */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll([
          // Add URLs to cache here (if needed)
        ]);
      })
  );
});

/**
 * Event listener for 'fetch' events.
 * This will handle network requests and serve cached responses when available.
 */
self.addEventListener('fetch', event => {
  const requestUrl = new URL(event.request.url);
  
  // Exclude specific URLs from caching
  if (requestUrl.hostname === 'lh3.googleusercontent.com') {
    // Skip caching for profile pictures hosted on Googleusercontent.com
    return;
  }

  // Skip caching for POST requests
  if (event.request.method === 'POST') {
    return;
  }

  // Skip caching for PUT requests
  if (event.request.method === 'PUT') {
    return;
  }

  // Skip caching for DELETE requests
  if (event.request.method === 'DELETE') {
    return;
  }

  // Handle the fetch event by trying to serve from the cache first, then network
  event.respondWith(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.match(event.request)
          .then(cachedResponse => {
            const fetchPromise = fetch(event.request)
              .then(networkResponse => {
                // Cache the fetched response if it's successful and not excluded
                if (networkResponse.ok && requestUrl.hostname !== 'lh3.googleusercontent.com') {
                  cache.put(event.request, networkResponse.clone());
                }
                return networkResponse;
              })
              .catch(() => {
                // If fetch fails, return the cached response if available
                return cachedResponse || new Response(null, { status: 404, statusText: 'Cache Not found' });
              });

            // Return cached response immediately or wait for the fetch promise
            return cachedResponse || fetchPromise;
          });
      })
  );
});

/**
 * Event listener for 'activate' events.
 * This will handle the activation of the new service worker and cleanup of old caches.
 */
self.addEventListener('activate', event => {
  const currentCaches = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          // Delete old caches that are not in the current caches list
          if (!currentCaches.includes(cache)) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});
