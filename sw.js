const CACHE='vitala-c6d3b2b2';
const FILES=["./", "apple-touch-icon.png", "icon-192.png", "icon-512.png", "icon-maskable.png", "index.html", "manifest.webmanifest", "poppins-400.ttf", "poppins-500.ttf"];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>Promise.allSettled(FILES.map(f=>c.add(f)))))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>n.startsWith('vitala-')&&n!==CACHE).map(n=>caches.delete(n)))).then(()=>clients.claim())));
// network first so updates show up, cache when offline
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
 e.respondWith(fetch(e.request).then(r=>{if(r.ok&&new URL(e.request.url).origin===location.origin){const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy))}return r}).catch(()=>caches.match(e.request,{ignoreSearch:true})))});
