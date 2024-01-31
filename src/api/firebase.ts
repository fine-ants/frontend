/* eslint-disable no-console */
import { initializeApp } from "firebase/app";
import {
  deleteToken as fbDeleteToken,
  getMessaging,
  getToken,
  onMessage,
} from "firebase/messaging";

const firebaseApp = initializeApp({
  apiKey: import.meta.env.VITE_FCM_API_KEY,
  authDomain: import.meta.env.VITE_FCM_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FCM_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FCM_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FCM_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FCM_APP_ID,
  measurementId: import.meta.env.VITE_FCM_MEASUREMENT_ID,
});

// Retrieve an instance of Firebase Messaging so that it can handle background messages.
const messaging = getMessaging(firebaseApp);

export const fetchToken = async () => {
  try {
    const token = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_FCM_VAPID_KEY,
    });

    if (token) {
      console.log("current token for client: ", token);
      return token;
      // Track the token -> client mapping, by sending to backend server show on the UI that permission is secured
    } else {
      console.log(
        "No registration token available. Request permission to generate one."
      );
      return null;
      // shows on the UI that permission is required
    }
  } catch (error) {
    console.log("An error occurred while retrieving token. ", error);
  }
};

export const deleteToken = async () => {
  try {
    return fbDeleteToken(messaging);
    // Once token is deleted update UI.
    // Inform the backend server about unsubscription
  } catch (error) {
    console.log("An error occurred while deleting token. ", error);
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
