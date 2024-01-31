// Dead

// import { ReactNode, createContext, useState } from "react";

// export const NotificationSWRegContext = createContext<{
//   notificationSWReg: ServiceWorkerRegistration | null;
//   registerNotificationSW: () => void;
// }>({ notificationSWReg: null, registerNotificationSW: () => {} });

// export function NotificationSWRegProvider({
//   children,
// }: {
//   children: ReactNode;
// }) {
//   const [notificationSWReg, setNotificationSWReg] =
//     useState<ServiceWorkerRegistration | null>(null);

//   const registerNotificationSW = async () => {
//     if ("serviceWorker" in navigator && "PushManager" in window) {
//       try {
//         // Path is relative to the URL of the HTML file
//         const swReg = await navigator.serviceWorker.register(
//           "./notificationServiceWorker.js",
//           { type: "module" }
//         );
//         // eslint-disable-next-line no-console
//         console.log("swReg", swReg);
//         setNotificationSWReg(swReg);
//       } catch (error) {
//         // eslint-disable-next-line no-console
//         console.error("Service Worker Error", error);
//       }
//     }
//   };

//   return (
//     <NotificationSWRegContext.Provider
//       value={{ notificationSWReg, registerNotificationSW }}>
//       {children}
//     </NotificationSWRegContext.Provider>
//   );
// }
