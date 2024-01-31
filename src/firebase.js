/* eslint-disable no-console */
import { initializeApp } from "firebase/app";
import {
  deleteToken as fbDeleteToken,
  getMessaging,
  getToken,
  onMessage,
} from "firebase/messaging";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyC5sdAwCt40OjlGw7MudjpyVF_qF8vQqoc",
  authDomain: "fineants-398e6.firebaseapp.com",
  projectId: "fineants-398e6",
  storageBucket: "fineants-398e6.appspot.com",
  messagingSenderId: "240214308399",
  appId: "1:240214308399:web:92da28e18bfbd6f81d78da",
  measurementId: "G-5VDLWJ38M1",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = getMessaging(firebaseApp);

export const fetchToken = async () => {
  try {
    const token = await getToken(messaging, {
      vapidKey:
        "BJLg5PBPQwIdBEQQChYUWQCUJi0SJrwrvuCCtnE6by5ZJ8zlSgQDGV89kWWw-iLG1zTMdQy9iIkfYNLna4GW4Cg",
    });

    if (token) {
      console.log("current token for client: ", token);
      return token;
      // Track the token -> client mapping, by sending to backend server
      // show on the UI that permission is secured
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
