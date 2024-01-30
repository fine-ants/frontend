self.addEventListener("install", function () {
  // eslint-disable-next-line no-console
  console.log("Notification SW Installed!");
});

self.addEventListener(
  "push",
  /**
   * @param {Object} event.data 받은 메시지
   * @param {string} event.data.content Notification 내용
   * @param {Date} event.data.timestamp Notification 시간
   * @param {Object} event.data.entity Notification 종류 및 ID
   */
  async function (event) {
    const title = "FineAnts";
    const message = event.data?.json();
    const options = {
      icon: "https://avatars.githubusercontent.com/u/147464557?s=96&v=4",
      badge: "https://avatars.githubusercontent.com/u/147464557?s=96&v=4",
      body: message.content,
      timestamp: new Date(message.timestamp).getTime(),
      data: {
        entity: message.entity,
      },
    };

    // Send OS Push Notification
    const notificationPromise = self.registration.showNotification(
      title,
      options
    );
    event.waitUntil(notificationPromise);

    // Send message to main script
    const clients = await self.clients.matchAll();
    clients.forEach((client) => client.postMessage(message));
  }
);

// 사용자가 Desktop Notification을 클릭했을 때
self.addEventListener("notificationclick", async function (event) {
  const { entity } = event.notification.data;

  const url =
    entity.type === "stock"
      ? `${self.origin}/stock/${entity.id}`
      : `${self.origin}/portfolio/${entity.id}`;

  event.notification.close();

  event.waitUntil(self.clients.openWindow(url));
});
