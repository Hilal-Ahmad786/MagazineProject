// public/sw.js
// Service Worker disabled for development stability.
// This file is kept as a placeholder to prevent 404s if the browser tries to fetch it.

const CACHE_NAME = 'mazhar-v3-disabled';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// No-op fetch handler to bypass cache completely
self.addEventListener('fetch', (event) => {
  // Pass through to network
});
