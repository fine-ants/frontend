import { SignInData, User } from "@api/auth";
import { deleteToken, fetchToken } from "@api/firebase";
import { ReactNode, createContext, useState } from "react";

export const UserContext = createContext<{
  user: User | null;
  onSignIn: (signInData: SignInData) => void;
  onSignOut: () => void;
  onEditProfileDetails: (user: User) => void;
  onSubscribePushNotification: () => void;
  onUnsubscribePushNotification: () => void;
}>({
  user: null,
  onSignIn: () => {},
  onSignOut: () => {},
  onEditProfileDetails: () => {},
  onSubscribePushNotification: () => {},
  onUnsubscribePushNotification: () => {},
});

export function UserProvider({ children }: { children: ReactNode }) {
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

  const onSubscribePushNotification = async () => {
    try {
      const token = await fetchToken();
      if (token) {
        // server로 보내 (tanstack query meta toast로 성공/에러 처리)
        // await postPushServiceSubscription(subscription);
      }
    } catch (error) {
      // Subscription failed
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  const onUnsubscribePushNotification = async () => {
    // Token을 서버로 보내기
    // 200이 오면 token context 초기화

    try {
      const res = await deleteToken();

      if (res) {
        // Inform the application server that the user has unsubscribed
        // await deletePushServiceSubscription(subscription);
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
        onSubscribePushNotification,
        onUnsubscribePushNotification,
      }}>
      {children}
    </UserContext.Provider>
  );
}
