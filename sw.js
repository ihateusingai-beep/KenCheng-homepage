const CACHE_NAME = 'kencheng-homepage-v7';
const STATIC_ASSETS = [
  '/KenCheng-homepage/',
  '/KenCheng-homepage/index.html',
  '/KenCheng-homepage/vite.svg',
  '/KenCheng-homepage/manifest.json',
  '/KenCheng-homepage/sw.js'
];

// External resources to cache
const EXTERNAL_ASSETS = [
  'https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;600;700&display=swap',
  '/KenCheng-homepage/assets/index-ChxI5wjT.js',
  '/KenCheng-homepage/assets/index-DSuGoZSV.css'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      // Cache static assets
      await cache.addAll(STATIC_ASSETS).catch(() => {});
      // Try to cache external assets but don't fail if offline
      await Promise.allSettled(
        EXTERNAL_ASSETS.map(url =>
          fetch(url, { mode: 'cors' })
            .then(res => res.ok ? cache.put(url, res) : Promise.reject())
            .catch(() => {})
        )
      );
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip chrome-extension and other non-http(s) requests
  if (!url.protocol.startsWith('http')) return;

  // Skip service worker itself
  if (url.pathname.endsWith('/sw.js')) return;

  event.respondWith(
    caches.match(request).then(async (cachedResponse) => {
      // Return cached version if available
      if (cachedResponse) {
        // Background update: fetch and cache in background
        fetch(request)
          .then(networkResponse => {
            if (networkResponse && networkResponse.status === 200) {
              caches.open(CACHE_NAME).then(cache => {
                cache.put(request, networkResponse.clone());
              });
            }
          })
          .catch(() => {});
        return cachedResponse;
      }

      // No cache - fetch from network
      try {
        const networkResponse = await fetch(request);

        // Cache successful responses
        if (networkResponse && networkResponse.status === 200) {
          const responseClone = networkResponse.clone();
          const cache = await caches.open(CACHE_NAME);
          // Don't cache if it's a different origin resource (except fonts)
          if (url.origin === location.origin ||
              url.hostname === 'fonts.googleapis.com' ||
              url.hostname === 'fonts.gstatic.com') {
            cache.put(request, responseClone);
          }
        }
        return networkResponse;
      } catch (error) {
        // Network failed and no cache - return offline fallback for HTML
        if (request.headers.get('accept')?.includes('text/html')) {
          const offlineCache = await caches.match('/KenCheng-homepage/index.html');
          if (offlineCache) return offlineCache;
        }
        // Return a basic error response for other requests
        return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
      }
    })
  );
});

// Handle messages from the main thread
self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});