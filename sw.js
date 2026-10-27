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
   v3: History's own question formats and ~330 new questions.
   v4: a friend's challenge arrives as ?d=… on the page's address; the page is
   kept once, under its plain address, however many challenges are opened.
   v5: the fonts are the app's own (img/fonts), not Google's: an installed copy has them offline.
   v6: the game's script is its own file, app.js, named by its content (APP, stamped by
   tools/history/page.py at every build): kept with the page, and compiled once, not at every launch. */
const VERSION = 'v6';
const APP = 'app.js?v=8abb3f3e01';
const NAV_WAIT = 2500;   // ms the network gets to bring the page before the kept copy opens
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
  '/history-quiz/' + APP,
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
      // the scripts of earlier builds, kept under this same version's cache, go too
      .then(() => caches.open(CACHE)).then(c => c.keys().then(reqs => Promise.all(reqs
        .filter(r => /\/app\.js\?v=/.test(r.url) && !r.url.endsWith('/' + APP)).map(r => c.delete(r)))))
      .catch(() => {})
      .then(() => self.clients.claim())
  );
});

/* ── Fetch ── */
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;
  if (!sameOrigin) return;   // the fonts are the app's own now (img/fonts), kept with the pictures

  const isDoc = req.mode === 'navigate'
             || req.destination === 'document'
             || url.pathname.endsWith('.html')
             || url.pathname.endsWith('/');

  if (isDoc) {
    // network-first: always try to pick up a new build. Pages sends
    // max-age=600, so without no-cache the browser's own HTTP cache hands
    // back the previous build for ten minutes after a deploy.
    // But a weak signal is not made to wait for the whole page: after
    // NAV_WAIT the copy already kept opens, and the new one, still coming,
    // is kept for the next time the app is opened.
    const key = url.search ? url.origin + url.pathname : req;
    const kept = () => caches.match(key).then(r => r || caches.match('/history-quiz/index.html'));
    // The race is against the whole new build, not the page's first bytes: the page and the
    // app.js it names (the page is small; the script is most of the weight). The page is kept
    // only once its script is, so the copy kept is always a page with its own script.
    const net = fetch(req, { cache: 'no-cache' }).then(res => res && res.status === 200
      ? res.text().then(html => {
          const m = html.match(/<script src="(app\.js\?v=[0-9a-f]+)"/);
          const app = m && new URL(m[1], req.url).href;
          const ready = !app ? Promise.resolve() : caches.match(app).then(hit => hit || fetch(app).then(r => {
            if (!r.ok) throw new Error('app ' + r.status);
            return caches.open(CACHE).then(c => c.put(app, r));
          }));
          // a fresh response, with only its type: the body is already decoded, so the
          // network's Content-Encoding and Content-Length no longer describe it
          const fresh = () => new Response(html, { status: 200, headers: { 'Content-Type': res.headers.get('Content-Type') || 'text/html; charset=utf-8' } });
          return ready.then(() => caches.open(CACHE).then(c => c.put(key, fresh())).then(fresh, fresh));
        })
      : res);
    e.waitUntil(net.catch(() => {}));
    e.respondWith(new Promise(resolve => {
      let done = false;
      const give = r => { if (!done && r) { done = true; resolve(r); } };
      const timer = setTimeout(() => kept().then(give, () => {}), NAV_WAIT);
      // whatever fails, the launch is answered: the network's page, the kept one, or an error page
      net.then(res => { clearTimeout(timer); give(res); },
               () => { clearTimeout(timer); kept().then(r => give(r || Response.error()), () => give(Response.error())); });
    }));
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
