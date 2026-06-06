// Recipe Manager Pro — Service Worker v3.0
// Supports offline mode, background sync, Samsung Browser

const CACHE_NAME = 'recipe-manager-v3';
const OFFLINE_URL = './index.html';

// Files to cache immediately on install
const PRECACHE_URLS = [
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js',
];

// ── Install ───────────────────────────────────────────
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_URLS.map(url => {
        return new Request(url, { mode: url.startsWith('http') ? 'cors' : 'same-origin' });
      })).catch(err => {
        console.warn('[SW] Precache partial failure (ok):', err);
        return cache.add(OFFLINE_URL);
      });
    }).then(() => self.skipWaiting())
  );
});

// ── Activate ─────────────────────────────────────────
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// ── Fetch — Network first, fallback to cache ─────────
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  // Skip extension requests and chrome-extension
  const url = event.request.url;
  if (url.startsWith('chrome-extension://') || url.startsWith('moz-extension://')) return;

  // For API calls (pollinations.ai) — network only, no cache
  if (url.includes('pollinations.ai') || url.includes('api.anthropic')) return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Cache successful responses
        if (response && response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        // Network failed — try cache
        return caches.match(event.request).then((cached) => {
          if (cached) return cached;
          // For navigation requests, return the app shell
          if (event.request.mode === 'navigate') {
            return caches.match(OFFLINE_URL);
          }
          return new Response('Offline', { status: 503 });
        });
      })
  );
});

// ── Background Sync (for future use) ─────────────────
self.addEventListener('sync', (event) => {
  if (event.tag === 'recipe-sync') {
    event.waitUntil(Promise.resolve());
  }
});

// ── Push Notifications (placeholder) ─────────────────
self.addEventListener('push', (event) => {
  if (!event.data) return;
  const data = event.data.json();
  self.registration.showNotification(data.title || 'Recipe Manager', {
    body: data.body || '',
    icon: './icons/icon-192.png',
    badge: './icons/icon-72.png',
    data: data,
  });
});
