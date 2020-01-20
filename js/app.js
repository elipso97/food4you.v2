/*jshint esversion: 6 */
/*jshint -W030 */

// service worker registration
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(() => console.log('service worker registered'))
    .catch(() => console.log('service worker not registered'));
}
