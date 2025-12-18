// public/sw.js
// Service Worker for Mazhar Dergisi PWA

const CACHE_NAME = 'mazhar-v2';
const STATIC_CACHE = 'mazhar-static-v2';
const DYNAMIC_CACHE = 'mazhar-dynamic-v2';
const IMAGE_CACHE = 'mazhar-images-v2';

// Static assets to cache on install
const STATIC_ASSETS = [
  '/',
  '/offline',
  '/yazilar',
  '/yazarlar',
  '/sayilar',
  '/hakkimizda',
  '/manifest.json',
];

// Cache size limits
const CACHE_LIMITS = {
  dynamic: 50,
  images: 100,
};

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');

  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('[SW] Static assets cached');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[SW] Failed to cache static assets:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...');

  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => {
              return name.startsWith('mazhar-') &&
                name !== STATIC_CACHE &&
                name !== DYNAMIC_CACHE &&
                name !== IMAGE_CACHE;
            })
            .map((name) => {
              console.log('[SW] Deleting old cache:', name);
              return caches.delete(name);
            })
        );
      })
      .then(() => {
        console.log('[SW] Service worker activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip cross-origin requests
  if (url.origin !== location.origin) return;

  // Skip API requests
  if (url.pathname.startsWith('/api/')) return;

  // Handle different request types
  if (isImageRequest(request)) {
    event.respondWith(cacheFirstWithRefresh(request, IMAGE_CACHE));
  } else if (isStaticAsset(request)) {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
  } else {
    event.respondWith(networkFirstWithCache(request, DYNAMIC_CACHE));
  }
});

// Check if request is for an image
function isImageRequest(request) {
  const url = new URL(request.url);
  return (
    request.destination === 'image' ||
    /\.(jpg|jpeg|png|gif|webp|svg|ico)$/i.test(url.pathname)
  );
}

// Check if request is for a static asset
function isStaticAsset(request) {
  const url = new URL(request.url);
  return (
    /\.(js|css|woff|woff2|ttf|eot)$/i.test(url.pathname) ||
    url.pathname.startsWith('/_next/static/')
  );
}

// Cache-first strategy
async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.error('[SW] Cache-first fetch failed:', error);
    return caches.match('/offline');
  }
}

// Cache-first with background refresh
async function cacheFirstWithRefresh(request, cacheName) {
  const cached = await caches.match(request);

  // Fetch in background
  const fetchPromise = fetch(request)
    .then((response) => {
      if (response.ok) {
        caches.open(cacheName).then((cache) => {
          cache.put(request, response.clone());
          trimCache(cacheName, CACHE_LIMITS.images);
        });
      }
      return response;
    })
    .catch(() => cached);

  return cached || fetchPromise;
}

// Network-first with cache fallback
async function networkFirstWithCache(request, cacheName) {
  try {
    const response = await fetch(request);

    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
      trimCache(cacheName, CACHE_LIMITS.dynamic);
    }

    return response;
  } catch (error) {
    console.log('[SW] Network failed, trying cache:', request.url);

    const cached = await caches.match(request);
    if (cached) {
      return cached;
    }

    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      return caches.match('/offline');
    }

    throw error;
  }
}

// Trim cache to limit
async function trimCache(cacheName, maxItems) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();

  if (keys.length > maxItems) {
    const deleteCount = keys.length - maxItems;
    for (let i = 0; i < deleteCount; i++) {
      await cache.delete(keys[i]);
    }
  }
}

// Handle messages from client
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((names) => {
        return Promise.all(names.map((name) => caches.delete(name)));
      })
    );
  }
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync:', event.tag);

  if (event.tag === 'sync-comments') {
    event.waitUntil(syncComments());
  }

  if (event.tag === 'sync-reading-list') {
    event.waitUntil(syncReadingList());
  }
});

// Sync comments when back online
async function syncComments() {
  // Implement comment sync logic here
  console.log('[SW] Syncing comments...');
}

// Sync reading list when back online
async function syncReadingList() {
  // Implement reading list sync logic here
  console.log('[SW] Syncing reading list...');
}

// Push notifications
self.addEventListener('push', (event) => {
  if (!event.data) return;

  const data = event.data.json();

  const options = {
    body: data.body || 'Yeni içerik mevcut!',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      url: data.url || '/',
    },
    actions: [
      { action: 'open', title: 'Aç' },
      { action: 'close', title: 'Kapat' },
    ],
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'Mazhar Dergisi', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'close') return;

  const url = event.notification.data?.url || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        // Focus existing window if available
        for (const client of clientList) {
          if (client.url === url && 'focus' in client) {
            return client.focus();
          }
        }
        // Open new window
        if (clients.openWindow) {
          return clients.openWindow(url);
        }
      })
  );
});
