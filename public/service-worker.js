// const CACHE_NAME = "offline-cache";

// const urlsToCache = [
//   "/",
//   "/index.html",
//   "/favicon.ico", // Ensure favicon is cached
//   "/static/js/main.js", // Adjust as per build structure
//   "/static/css/main.css",
// ];

// /* eslint-disable no-restricted-globals */
// self.addEventListener("install", (event) => {
//   event.waitUntil(
//     caches
//       .open(CACHE_NAME)
//       .then((cache) => {
//         console.log("Opened cache");
//         return cache.addAll(urlsToCache);
//       })
//       .catch((err) => console.error("Failed to cache assets", err))
//   );
// });

// /* eslint-disable no-restricted-globals */
// self.addEventListener("fetch", (event) => {
//   event.respondWith(
//     caches
//       .match(event.request)
//       .then((response) => {
//         // Serve from cache or fetch from network
//         return response || fetch(event.request);
//       })
//   .catch((err) => {
//     console.error("Fetch failed for:", event.request.url, err);
//     // Optionally serve a fallback response
//     return caches.match("/index.html"); // Fallback for HTML pages
//   })
//   );
// });



// -------------------------------------------------------------------------

// /* eslint-disable no-restricted-globals */

// const CACHE_NAME = "offline-todo-cache-v1";
// const urlsToCache = [
//   "./", // Use "./" for the root
//   "./index.html",
//   "./manifest.json",
//   "./favicon.ico",
//   "./logo192.png",
//   "./logo512.png",
//   //   "./static/js/main.*.js", // Use relative paths for JS and CSS
//   //   "./static/css/main.*.css",
//   //   "./static/js/main.152d3020.js", // Use relative paths for JS and CSS
//   //   "./static/css/main.e6c13ad2.css",
// ];

// self.addEventListener("install", (event) => {
//   event.waitUntil(
//     caches
//       .open(CACHE_NAME)
//       .then(async (cache) => {
//         console.log("Opened cache");

//         // Cache all static assets (JS, CSS)
//         const staticAssets = await fetch("./asset-manifest.json")
//           .then((response) => response.json())
//           .then((manifest) => Object.values(manifest.files));

//         return cache.addAll(urlsToCache, ...staticAssets);
//       })
//       .catch((err) => console.error("Failed to cache assets", err))
//   );
// });

// self.addEventListener("fetch", (event) => {
//   event.respondWith(
//     caches
//       .match(event.request)
//       .then((response) => {
//         return response || fetch(event.request);
//       })
//       .catch((err) => {
//         console.error("Fetch failed for:", event.request.url, err);
//         // Optionally serve a fallback response
//         return caches.match("/index.html"); // Fallback for HTML pages
//       })
//   );
// });

// self.addEventListener("activate", (event) => {
//   const cacheWhitelist = [CACHE_NAME];
//   event.waitUntil(
//     caches.keys().then((cacheNames) => {
//       return Promise.all(
//         cacheNames.map((cacheName) => {
//           if (!cacheWhitelist.includes(cacheName)) {
//             return caches.delete(cacheName);
//           }
//         })
//       );
//     })
//   );
// });


/* eslint-disable no-restricted-globals */
const CACHE_NAME = "offline-todo-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/favicon.ico",
  "/logo192.png",
  "/logo512.png",
  "/manifest.json",
  "./static/js/main.a1aec329.js",
  "./static/css/main.afed0643.css",
];

// Install Event

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(async (cache) => {
        console.log("Opened cache");

        // Cache all static assets (JS, CSS)
        const staticAssets = await fetch("./asset-manifest.json")
          .then((response) => response.json())
          .then((manifest) => Object.values(manifest.files));

        return cache.addAll(urlsToCache, ...staticAssets);
      })
      .catch((err) => console.error("Failed to cache assets", err))
  );
});


// Fetch Event
// self.addEventListener("fetch", (event) => {
//   event.respondWith(
//     caches.match(event.request).then((response) => {
//       // Serve cached response or fetch from network
//       return (
//         response ||
//         fetch(event.request).catch(() => caches.match("/index.html"))
//       );
//     })
//   );
// });

self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .catch(() => caches.match(event.request))
      .then((response) => {
        return response || caches.match("/index.html");
      })
  );
});


// Activate Event
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        // eslint-disable-next-line array-callback-return
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
