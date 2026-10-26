// Setboek service worker: app offline beschikbaar, updates bij volgende start met internet.
const CACHE = 'setboek-v3';
const SHELL = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './icon-maskable-512.png', './apple-touch-icon.png', './abb/abb7.png', './abb/abb11.png', './abb/abb33.png', './abb/abb38.png', './abb/abb42.png', './abb/abb50.png', './abb/abb52.png', './abb/abb64.png', './abb/abb91.png', './abb/abb92.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith('setboek-') && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request; if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Andere apps in submappen (zoals ./ietje/) hebben hun eigen service worker
  if (url.origin === location.origin && url.pathname.startsWith(new URL('./ietje/', self.registration.scope).pathname)) return;
  // App zelf: eerst netwerk (nieuwste versie), anders uit cache
  if (req.mode === 'navigate' || (url.origin === location.origin && url.pathname.endsWith('.html'))) {
    e.respondWith(fetch(req).then(r => { const c = r.clone(); caches.open(CACHE).then(x => x.put('./index.html', c)); return r; })
      .catch(() => caches.match('./index.html')));
    return;
  }
  // Lettertypes en overige bestanden: cache, op de achtergrond verversen
  e.respondWith(caches.match(req).then(hit => {
    const net = fetch(req).then(r => { if (r && (r.ok || r.type === 'opaque')) { const c = r.clone(); caches.open(CACHE).then(x => x.put(req, c)); } return r; }).catch(() => hit);
    return hit || net;
  }));
});
