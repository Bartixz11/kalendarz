const CACHE_NAME = 'planer-cache-v2';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
];

// Instalacja SW i wgrywanie plików do Cache
self.addEventListener('install', event => {
  self.skipWaiting(); // Wymusza natychmiastową aktywację nowego SW
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Otwarto cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Czyszczenie starych wersji Cache przy aktualizacji kodu
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Usuwanie starego cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Przechwytywanie żądań - Strategia: Cache First, potem Sieć
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Jeśli plik jest w pamięci urządzenia - zwróć go (działa offline!)
        if (response) {
          return response;
        }
        // W przeciwnym razie pobierz z internetu
        return fetch(event.request);
      })
  );
});