// Keep the in-memory Runner alive when a workout status notification is tapped.
// Other notifications retain the normal app-navigation behavior.
self.addEventListener('notificationclick', (event) => {
  const notification = event.notification;
  const data = notification?.data || {};
  const scopeUrl = new URL(self.registration.scope);
  const target = data.link ? new URL(data.link, scopeUrl).href : new URL('./', scopeUrl).href;
  notification?.close();

  event.waitUntil((async () => {
    const windows = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    const appWindow = windows.find((client) => {
      const url = new URL(client.url);
      return url.origin === scopeUrl.origin && url.pathname.startsWith(scopeUrl.pathname);
    });

    if (data.kind === 'workout-live') {
      // Do not navigate/reload: that discards the active React Runner state.
      if (appWindow) return appWindow.focus();
      return self.clients.openWindow ? self.clients.openWindow(target) : null;
    }

    if (appWindow) {
      try { await appWindow.navigate(target); } catch {}
      return appWindow.focus();
    }
    return self.clients.openWindow ? self.clients.openWindow(target) : null;
  })());
});
