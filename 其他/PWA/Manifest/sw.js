/*API地址参考：https://developers.google.com/web/fundamentals/codelabs/your-first-pwapp/
  参考地址：https://juejin.im/post/5a9e8ad5f265da23a40456d4
*/

var cacheName = 'helloWorld'
var filesToCache = [
  '/',  // 这个一定要包含整个目录，不然无法离线浏览
  './PWA.png',
  './index.html',
];

/* 注册serviceWorker服务工作线程后，用户首次访问页面时将会触发install安装事件。
   处理：在此事件处理程序内，我们将缓存应用所需的全部资源数据
*/
self.addEventListener('install', event => {
  console.log('[ServiceWorker] Install');
  event.waitUntil(
    // 打开缓存
    caches.open(cacheName)
    // 带有网址列表参数的方法会从从服务器获取文件，并将响应添加到缓存内
    .then(cache => {
      console.log('[ServiceWorker] Caching app shell');
      // cache.addAll() 具有原子性，如果任何一个文件失败，整个缓存步骤也将失败！
      cache.addAll(filesToCache)
    }).then(() => self.skipWaiting())
  )
})

/* activate 事件会在服务工作线程启动时触发
   处理：文件更改时更新其缓存
*/
self.addEventListener('activate', event => {
  console.log('[ServiceWorker] Activate');
  event.waitUntil(
    caches.keys().then((keyList) => {
      console.log('[ServiceWorker] caches keys: ', keyList);
      return Promise.all(
        keyList.map(key => {
          if (key !== cacheName) {
            console.log('[ServiceWorker] Removing old cache', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

/* 决定想要如何处理请求，并可提供我们自己的已缓存响应
   处理：拦截 Progressive Web App 发出的请求并在服务工作线程内对它们进行处理的能力
*/
self.addEventListener('fetch', (e) => {
    // 判断地址是不是需要实时去请求，是就继续发送请求
    if (e.request.url.indexOf('/api/400/200') > -1) {
        e.respondWith(
            caches.open(imgCacheName).then(function(cache){
                 return fetch(e.request).then(function (response){
                    cache.put(e.request.url, response.clone()); // 每请求一次缓存更新一次新加载的图片
                    return response;
                });
            })
        );
    } else {
        e.respondWith(
            // 匹配到缓存资源，就从缓存中返回数据。caches.match() 会由内而外对触发fetch事件的网络请求进行评估，并检查以确认它是否位于缓存内
            caches.match(e.request).then(function (response) {
                return response || fetch(e.request);
            })
        );
    }
});