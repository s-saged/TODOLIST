const CACHE_NAME = 'todo-cache-v1';
const ASSETS = [
  '/',
  'index.html',
  'style.css',
  'app.js',
  'icon.png',
  'manifest.json'
];

// تثبيت الـ Service Worker وحفظ الملفات
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// تشغيل التطبيق وجلب الملفات من الكاش لو مفيش نت
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});