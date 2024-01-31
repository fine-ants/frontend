importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyC5sdAwCt40OjlGw7MudjpyVF_qF8vQqoc",
  authDomain: "fineants-398e6.firebaseapp.com",
  projectId: "fineants-398e6",
  storageBucket: "fineants-398e6.appspot.com",
  messagingSenderId: "240214308399",
  appId: "1:240214308399:web:92da28e18bfbd6f81d78da",
  measurementId: "G-5VDLWJ38M1",
});

const messaging = firebase.messaging(firebaseApp);

messaging.onBackgroundMessage(messaging, (payload) => {
  // Customize notification here
  const notificationTitle = "FineAnts";
  const options = {
    icon: "https://avatars.githubusercontent.com/u/147464557?s=96&v=4",
    badge: "https://avatars.githubusercontent.com/u/147464557?s=96&v=4",
    body: payload.content,
    timestamp: new Date(payload.timestamp).getTime(),
    data: {
      entity: payload.entity,
    },
  };

  self.registration.showNotification(notificationTitle, options);
});

self.addEventListener("install", () => {
  // eslint-disable-next-line no-console
  console.log("installed SW!");
});
