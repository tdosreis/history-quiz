/* ────────────────────────────────────────────────
   History Quiz — Service Worker

   Strategy differs by resource, on purpose:
     • HTML document → network-first, so a deploy reaches players
       immediately (the app is a TWA: the web page *is* the update
       channel, there is no Play release to ship).
     • images/icons  → cache-first; filenames are content-hashed so
       they can never go stale.
──────────────────────────────────────────────── */
/* v1: first release of History Quiz. Bump VERSION whenever index.html changes in a way
   that must reach installed copies at once; pictures live in their own cache.
   v2: the atelier textures (paper, brush strokes, answer slips, washes) the page
   always named but the first release never shipped — buttons, lifeline seals and
   backgrounds were invisible without them.
   v3: History's own question formats and ~330 new questions. */
const VERSION = 'v3';
const CACHE   = 'history-quiz-' + VERSION;
/* Photos, crests and flags never change under the same name (each file is
   named by its content), so they live in a cache of their own that survives
   updates. Wiping them with every version meant the first game after an
   update re-downloaded every picture, and on a weak signal cards came up
   blank. */
const IMG_CACHE = 'history-quiz-img-1';

const SHELL = [
  '/history-quiz/',
  '/history-quiz/index.html',
  '/history-quiz/manifest.json',
  '/history-quiz/icons/icon-192.png',
  '/history-quiz/icons/icon-512.png',
];

/* ── Install: precache the shell, take over right away ── */
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(SHELL).catch(() => {}))   // a 404 must not block install
      .then(() => self.skipWaiting())
  );
});

/* ── Activate: drop every previous version ── */
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE && k !== IMG_CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* ── Fetch ── */
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;
  const isFonts = url.hostname === 'fonts.googleapis.com'
               || url.hostname === 'fonts.gstatic.com';
  if (!sameOrigin && !isFonts) return;

  const isDoc = req.mode === 'navigate'
             || req.destination === 'document'
             || url.pathname.endsWith('.html')
             || url.pathname.endsWith('/');

  if (isDoc) {
    // network-first: always try to pick up a new build. Pages sends
    // max-age=600, so without no-cache the browser's own HTTP cache hands
    // back the previous build for ten minutes after a deploy.
    e.respondWith(
      fetch(req, { cache: 'no-cache' })
        .then(res => {
          if (res && res.status === 200) {
            const clone = res.clone();
            caches.open(CACHE).then(c => c.put(req, clone));
          }
          return res;
        })
        .catch(() => caches.match(req).then(r => r || caches.match('/history-quiz/index.html')))
    );
    return;
  }

  // pictures: cache-first from the lasting cache, one retry on the network
  if (sameOrigin && url.pathname.includes('/img/')) {
    const key = url.origin + url.pathname;
    const get = () => fetch(key);
    e.respondWith(
      caches.open(IMG_CACHE).then(c => c.match(key).then(hit => hit ||
        get().catch(() => new Promise(r => setTimeout(r, 600)).then(get)).then(res => {
          if (res && res.status === 200) c.put(key, res.clone());
          return res;
        })))
    );
    return;
  }

  // everything else: cache-first with background fill
  e.respondWith(
    caches.match(req).then(cached => {
      if (cached) return cached;
      return fetch(req).then(res => {
        if (res && res.status === 200) {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(req, clone));
        }
        return res;
      }).catch(() => cached);
    })
  );
});
