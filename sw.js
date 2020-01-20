/*jshint esversion: 6 */
/*jshint -W030 */

const staticCacheName = 'site-static-v18';
const dynamicCasheName = 'site-dynamic-18';
const assets = [
  '/',    // request urls for storing assets in the cache
  '/index.html',    // pre-cache core ui elements
  '/js/app.js',
  '/js/ui.js',
  '/js/materialize.min.js',
  '/css/styles.css',
  '/css/materialize.min.css',
  '/img/icons/logo-512.png',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://fonts.gstatic.com/s/materialicons/v48/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
  '/pages/fallback.html',
];

// cache size limit function
const limitCacheSize = (name, size)=> {
  caches.open(name).then(cache => {
    cache.keys().then(keys => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};

// install service worker
self .addEventListener('install', evt => {
    //console.log('service worker has been installed');
    evt.waitUntil(
      caches.open(staticCacheName).then(cache => {
        console.log('caching shell assets');
        cache.addAll(assets);
      })
    );
  });

// activate service service worker
self .addEventListener('activate', evt => {
    //console.log('service worker has been activated');
    // to delete old cache version
    evt.waitUntil(
      caches.keys().then(keys => {
        //console.log(keys);
        return Promise.all(keys
          .filter(key => key !== staticCacheName && key !== dynamicCasheName)
          .map(key => caches.delete(key))
        );
      })
    );
  });

// to pre-cache assets to let the app work offline
self .addEventListener('fetch', evt => {
    if (evt.request.url.indexOf('firestore.googleapis.com') === -1) {
      evt.respondWith(
      caches.match(evt.request).then(cacheRes => {
        return cacheRes || fetch(evt.request).then(fetchRes => {
          return caches.open(dynamicCasheName).then(cache => {
            cache.put(evt.request.url, fetchRes.clone());
            limitCacheSize(dynamicCasheName, 5);
            return fetchRes;
          });
        });   //Shows the offline page when files aren't pre-cached
      }).catch(() => {
        if (evt.request.url.indexOf('.html') > -1) {
          return caches.match('/pages/fallback.html');
        }
      })
    );
    }
  });
