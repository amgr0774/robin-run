/* Robin Run - offline cache */
var CACHE = 'feathersprint-v3';
var ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png',
  'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js'
];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) {
    // add each asset on its own so one failure can't sink the whole install
    return Promise.all(ASSETS.map(function (u) {
      return c.add(u).catch(function () {});
    }));
  }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.map(function (k) {
      return k === CACHE ? null : caches.delete(k);
    }));
  }).then(function () { return self.clients.claim(); }));
});

/* The game page is fetched network-first, so a new version shows up as soon
   as you open it online — cache-first meant an installed phone could keep
   serving a stale build indefinitely. Everything else stays cache-first,
   which is what makes offline play work. */
function isPage(req) {
  return req.mode === 'navigate' ||
         (req.headers.get('accept') || '').indexOf('text/html') !== -1;
}

self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;

  if (isPage(e.request)) {
    e.respondWith(
      fetch(e.request).then(function (res) {
        var copy = res.clone();
        caches.open(CACHE).then(function (c) { c.put(e.request, copy).catch(function () {}); });
        return res;
      }).catch(function () {
        // offline: fall back to whatever we cached last
        return caches.match(e.request).then(function (hit) {
          return hit || caches.match('./index.html');
        });
      })
    );
    return;
  }

  e.respondWith(
    caches.match(e.request).then(function (hit) {
      if (hit) return hit;
      return fetch(e.request).then(function (res) {
        var copy = res.clone();
        caches.open(CACHE).then(function (c) { c.put(e.request, copy).catch(function () {}); });
        return res;
      }).catch(function () {
        return caches.match('./index.html');
      });
    })
  );
});
