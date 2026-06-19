// sw.js
const CACHE = 'ps2-v1';
const ASSETS = ['/', '/index.html', '/css/style.css', '/data/sections.js',
  '/js/storage.js', '/js/app.js', '/js/profiles.js', '/js/survey.js', '/js/results.js',
  '/manifest.json'];

self.addEventListener('install',  e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS))); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch',    e => { e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).catch(() => caches.match('/index.html')))); });
