import { ReactNode, createContext, useState } from "react";

export const FCMContext = createContext<{
  fcmTokenId: number | null;
  onSubscribePushNotification: (fcmTokenId: number) => void;
  onUnsubscribePushNotification: () => void;
}>({
  fcmTokenId: null,
  onSubscribePushNotification: () => {},
  onUnsubscribePushNotification: () => {},
});

export function FCMProvider({ children }: { children: ReactNode }) {
  const [fcmTokenId, setFcmTokenId] = useState<number | null>(null);

  const onSubscribePushNotification = async (fcmTokenId: number) => {
    setFcmTokenId(fcmTokenId);
  };

  const onUnsubscribePushNotification = async () => {
    setFcmTokenId(null);
  };

  return (
    <FCMContext.Provider
      value={{
        fcmTokenId,
        onSubscribePushNotification,
        onUnsubscribePushNotification,
      }}>
      {children}
    </FCMContext.Provider>
  );
}
