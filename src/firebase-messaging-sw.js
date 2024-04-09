if (typeof importScripts === "function") {
  importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
  importScripts(
    "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
  );

  const firebaseApp = firebase.initializeApp({
    apiKey: import.meta.env.VITE_FCM_API_KEY,
    authDomain: import.meta.env.VITE_FCM_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FCM_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FCM_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FCM_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FCM_APP_ID,
    measurementId: import.meta.env.VITE_FCM_MEASUREMENT_ID,
  });

  firebase.messaging(firebaseApp);

  self.addEventListener("install", () => {
    // eslint-disable-next-line no-console
    console.log("installed SW!");
  });
}
