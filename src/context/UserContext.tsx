import { SignInData, User } from "@api/auth";
import { ReactNode, createContext, useContext, useState } from "react";
import { NotificationSWRegContext } from "./NotificationSWRegContext";

export const UserContext = createContext<{
  user: User | null;
  onSignIn: (signInData: SignInData) => void;
  onSignOut: () => void;
  onEditProfileDetails: (user: User) => void;
  onSubscribePushService: () => void;
  onUnsubscribePushService: () => void;
}>({
  user: null,
  onSignIn: () => {},
  onSignOut: () => {},
  onEditProfileDetails: () => {},
  onSubscribePushService: () => {},
  onUnsubscribePushService: () => {},
});

export function UserProvider({ children }: { children: ReactNode }) {
  const { notificationSWReg } = useContext(NotificationSWRegContext);

  const getUser = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  };

  const [user, setUser] = useState<User | null>(getUser());

  const onSignIn = ({
    jwt: { accessToken, refreshToken },
    user,
  }: SignInData) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  const onSignOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    setUser(null);
  };

  const onEditProfileDetails = (user: User) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  // FE --> Push Service
  // FE --> BE
  const onSubscribePushService = async () => {
    try {
      const subscription = await notificationSWReg?.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: import.meta.env.PUSH_SERVICE_PUBLIC_KEY,
      });
      if (subscription) {
        // server로 보내 (tanstack query meta toast로 성공/에러 처리)
        // const {data: {user}} = await postPushServiceSubscription(subscription);
        // setUser(user);
      }
    } catch (error) {
      // Subscription failed
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  const onUnsubscribePushService = async () => {
    const subscription = await notificationSWReg?.pushManager.getSubscription();

    if (!subscription) return;

    try {
      const res = await subscription.unsubscribe();

      if (res) {
        // Inform the application server that the user has unsubscribed
        // const {data: {user}} = await deletePushServiceSubscription(subscription);
        // setUser(user);
      } else {
        // Failed to unsubscribe
      }
    } catch (error) {
      // Error during unsubscribe
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        onSignIn,
        onSignOut,
        onEditProfileDetails,
        onSubscribePushService,
        onUnsubscribePushService,
      }}>
      {children}
    </UserContext.Provider>
  );
}
