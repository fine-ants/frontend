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
import { toast } from "src/main";
import {
  deleteFCMToken as deleteFCMTokenFromServer,
  postFCMToken as sendFCMTokenToServer,
} from "./notifications";
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

  const {
    data: { fcmTokenId },
  } = await sendFCMTokenToServer(regToken);
  return fcmTokenId;
};

const messagePayloadListener = (payload: MessagePayload) => {
  const { data } = payload;

  if (!data) return;

  const { title, body } = data;

  new Notification(title, { body });
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
      const fcmTokenId = await fetchAndSendFCMRegToken();
      onMessage(messaging, messagePayloadListener);
      return fcmTokenId;
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
      const fcmTokenId = await fetchAndSendFCMRegToken();
      onMessage(messaging, messagePayloadListener);
      return fcmTokenId;
    } catch (error) {
      console.error(error);
    }
  }
};

export const onDeactivateAllNotifications = async (fcmTokenId: number) => {
  const isTokenUnregisteredFromFCM = await deleteToken(messaging);

  if (isTokenUnregisteredFromFCM) {
    await deleteFCMTokenFromServer(fcmTokenId);
  }
};
