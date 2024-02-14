/* eslint-disable no-console */
import { initializeApp } from "firebase/app";
import {
  MessagePayload,
  getMessaging,
  getToken,
  isSupported,
  onMessage,
} from "firebase/messaging";
import { toast } from "src/main";
import { postFCMToken } from "./notifications";
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
  try {
    const res = await postFCMToken(currentToken);
    res.data.fcmTokenId;
  } catch (error) {
    console.error("Error sending token to server: ", error);
  }
};

// TODO: this.bgMessageHandler is not a function error when app is in background
const messagePayloadListener = (payload: MessagePayload) => {
  const { data } = payload;

  if (!data) return;

  const { title, body, type, referenceId, timestamp } = data;

  // TODO: 알림 UI 띄우기 및 알림 수 증가
  // eslint-disable-next-line no-console
  console.log(title, body, type, referenceId, timestamp);
};

// Call upon app initialization
export const setupFCMToken = async (user: User) => {
  if (!isSupported()) {
    toast.error("현재 사용하시는 브라우저가 알림 기능을 지원하지 않습니다");
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
      toast.error("실시간 알림 서비스에 문제가 발생하여 새로고침이 필요합니다");
    }
  }

  if (
    user?.notificationPreferences.browserNotify === true &&
    Notification.permission !== "granted"
  ) {
    toast.info("알림을 받기 위해서는 브라우저 설정에서 알림을 허용해주세요");
  }
};

// For toggle
export const onActivateNotification = async () => {
  if (!isSupported()) {
    toast.error("현재 사용하시는 브라우저가 알림 기능을 지원하지 않습니다");
    return;
  }

  const permission = Notification.permission;

  if (permission === "granted") {
    try {
      await fetchAndSendFCMRegToken();
      onMessage(messaging, messagePayloadListener);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }
};
