/* eslint-disable no-console */
import { initializeApp } from "firebase/app";
import {
  MessagePayload,
  deleteToken,
  getMessaging,
  getToken,
  isSupported,
  onMessage,
} from "firebase/messaging";
import { User } from "./user/types";

const firebaseApp = initializeApp({
  apiKey: import.meta.env.VITE_FCM_API_KEY,
  authDomain: import.meta.env.VITE_FCM_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FCM_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FCM_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FCM_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FCM_APP_ID,
  measurementId: import.meta.env.VITE_FCM_MEASUREMENT_ID,
});

const messaging = getMessaging(firebaseApp);

export const fetchFCMRegToken = async () => {
  const regToken = await getToken(messaging, {
    vapidKey: import.meta.env.VITE_FCM_VAPID_KEY,
  });
  return regToken;
};

export const fetchAndSendFCMRegToken = async () => {
  const regToken = await fetchFCMRegToken();
  await sendTokenToServer(regToken);
};

export const sendTokenToServer = async (currentToken: string) => {
  console.log("Sending token to server...", currentToken);
  // TODO(developer): Send the current token to your server.
};

export const deleteFCMRegToken = async () => {
  try {
    const currentToken = await getToken(messaging);

    try {
      if (currentToken) {
        await deleteToken(messaging);
        console.log("Token deleted: ", currentToken);
        // TODO: send delete token request to server
      }
    } catch (error) {
      console.error("Unable to delete token: ", error);
    }
  } catch (error) {
    console.error("Error retrieving registration token: ", error);
  }
};

// TODO: this.bgMessageHandler is not a function error when app is in background
const messagePayloadListener = (payload: MessagePayload) => {
  // TODO: 토스트 메시지로 띄우기 및 알림 수 증가
  // eslint-disable-next-line no-console
  console.log(payload);
};

// Call upon app initialization
export const setupFCMToken = async (user: User) => {
  if (!isSupported()) {
    console.log("FCM is not supported in this browser.");
    // TODO: show user feedback (toast?)
    return;
  }

  if (
    user.notificationPreferences.browserNotify === true &&
    Notification.permission === "granted"
  ) {
    try {
      await fetchAndSendFCMRegToken();
      onMessage(messaging, messagePayloadListener);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error fetching and sending token: ", error);
    }
  }

  if (
    user?.notificationPreferences.browserNotify === true &&
    Notification.permission !== "granted"
  ) {
    // TODO: User feedback (Ex: make sure to allow fineants.co to send notifications in your browser settings)
    // Notification.permission === "denied" -> "you blocked notifications. Please allow fineants.co to send notifications in your browser settings"
  }
};

// For toggle
export const onActivateNotification = async () => {
  if (!isSupported()) {
    console.log("FCM is not supported in this browser.");
    // TODO: show user feedback (toast?)
    return;
  }

  const permission = await Notification.requestPermission();
  if (permission === "granted") {
    try {
      await fetchAndSendFCMRegToken();
      onMessage(messaging, messagePayloadListener);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  } else {
    // TODO: User feedback (Ex: You have disabled notifications)
  }
};
