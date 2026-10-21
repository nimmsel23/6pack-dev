/* global importScripts, firebase */
// Push-Empfang der Standalone-6Pack-App (Scope /sixpack-push/, getrennt vom Haupt-SW sw.js).
// Die Fitness-App hat eigenen Empfang (fitness-messaging-sw.js) und kennt data.app === "sixpack" ebenfalls.

importScripts("https://www.gstatic.com/firebasejs/11.10.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/11.10.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyD1hvp2UYrvizLOzoSqOX-bwRWcCpJVAlg",
  authDomain: "fitness-aos.firebaseapp.com",
  projectId: "fitness-aos",
  storageBucket: "fitness-aos.firebasestorage.app",
  messagingSenderId: "842575255284",
  appId: "1:842575255284:web:65c4831683a893c110f0a1",
});

const messaging = firebase.messaging();
const DEFAULT_LINK = "./";

messaging.onBackgroundMessage((payload) => {
  const data = payload?.data || {};
  if (data.app !== "sixpack") return undefined;
  return self.registration.showNotification(data.title || "6Pack", {
    body: data.body || "Zeit fürs Training",
    icon: "/icon-192.png",
    badge: "/icon-192.png",
    // gleicher Tag wie die lokale Erinnerung (reminder.js) → ersetzt statt zu stapeln
    tag: data.tag || "sixpack-reminder",
    renotify: false,
    data: { link: data.link || DEFAULT_LINK },
  });
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const link = event.notification?.data?.link || DEFAULT_LINK;
  event.waitUntil((async () => {
    const clients = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    for (const client of clients) {
      if ("focus" in client) return client.focus();
    }
    return self.clients.openWindow ? self.clients.openWindow(new URL(link, self.location.origin).href) : null;
  })());
});
