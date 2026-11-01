/* global importScripts, firebase */
// Push-Empfang der Standalone-6Pack-App (Scope /sixpack-push/, getrennt vom Haupt-SW sw.js).
// Der Reminder kommt ausschließlich von scheduledSixpackReminders (functions/index.js) an Geräte,
// die diese App in sixpackPush registriert hat; die Fitness-App ist nicht beteiligt.

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const link = new URL("../", self.registration.scope).href;
  event.waitUntil((async () => {
    const clients = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    for (const client of clients) {
      if (client.url.startsWith(link) && "focus" in client) return client.focus();
    }
    return self.clients.openWindow ? self.clients.openWindow(new URL(link, self.location.origin).href) : null;
  })());
});

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

messaging.onBackgroundMessage((payload) => {
  const data = payload?.data || {};
  if (data.app !== "sixpack" || payload.notification) return undefined;
  return self.registration.showNotification(data.title || "6Pack", {
    body: data.body || "Zeit fürs Training",
    icon: "/icon-192.png",
    badge: "/icon-192.png",
    // Ein sichtbarer Reminder pro Gerät statt gestapelter Wiederholungen
    tag: data.tag || "sixpack-reminder",
    renotify: false,
    data: { link: new URL("../", self.registration.scope).href },
  });
});
