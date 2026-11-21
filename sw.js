// Day Log offline cache. Bump CACHE when you change any file so phones pick up the new version.
const CACHE = 'daylog-v2';
const FILES = ['./', 'index.html', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});

// Only clears old Day Log caches, so it never touches other apps on the same github.io address.
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('daylog-') && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Serve from cache straight away, refresh the cache in the background.
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET' || ![location.origin,'https://fonts.googleapis.com','https://fonts.gstatic.com'].includes(new URL(e.request.url).origin)) return;
  e.respondWith(
    caches.open(CACHE).then(async (cache) => {
      const hit = await cache.match(e.request, { ignoreSearch: true });
      const net = fetch(e.request)
        .then((res) => { if (res.ok || res.type === 'opaque') cache.put(e.request, res.clone()); return res; })
        .catch(() => hit);
      return hit || net;
    })
  );
});
