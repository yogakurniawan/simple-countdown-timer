/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js");

importScripts(
  "/simple-countdown-timer/precache-manifest.bb09a838e8a53284bf077ebebf771dc9.js"
);

workbox.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute("/index.html", {

  blacklist: [/^\/__/, /\/[^\/]+.[^\/]+$/],
});

self.addEventListener('fetch', async (event) => {
  if (event.request.url.endsWith('/users/1')) {
    // Configure the strategy in advance.
    const strategy = workbox.strategies.staleWhileRevalidate({
      cacheName: 'api-cache'
    });

    // Make two requests using the strategy.
    // Because we're passing in event, event.waitUntil() will be called automatically.
    // const promise = strategy.makeRequest({
    //   event,
    //   request: 'https://jsonplaceholder.typicode.com/users/1'
    // });
    // // const secondPromise = strategy.makeRequest({event, request: 'https://example.com/api2'});

    // const response = await promise;
    // console.log(response.text())
    // console.log(response)
    // const [firstBody, secondBody] = await Promise.all(firstResponse.text(), secondResponse.text());

    // // Assume that we just want to concatenate the first API response with the second to create the
    // // final response HTML.
    const compositeResponse = new Response(JSON.stringify({
      name: 'Yoga Kurniawan'
    }), {
      headers: {
        'content-type': 'text/html'
      },
    });

    event.respondWith(compositeResponse);
  }
});
