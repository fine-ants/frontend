import { SignInData } from "@api/auth";
import { deleteFCMRegToken, fetchFCMRegToken } from "@api/fcm";
import { User } from "@api/user/types";
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
      const token = await fetchFCMRegToken();
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
    try {
      const res = await deleteFCMRegToken();
      // eslint-disable-next-line no-console
      console.log(res);

      // if (res) {
      //   // 200이 오면 서버에 구독 취소를 알리기
      //   // await deletePushServiceSubscription(subscription);
      //   // 200이 오면 token context 초기화
      // }
    } catch (error) {
      // Error during deleting token and unsubscribing
      // eslint-disable-next-line no-console
      console.log("An error occurred while deleting token. ", error);
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
