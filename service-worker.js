// Basic service worker for caching static assets
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open("static-v1").then(function (cache) {
      return cache.addAll([
        "/index.html",
        "/src/style.css",
        "/src/app.js",
        "/manifest.json",
        // Add additional assets as needed
      ]);
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});
