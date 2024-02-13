import { SignInData } from "@api/auth";
import { fetchFCMRegToken } from "@api/fcm";
import { User } from "@api/user/types";
import { ReactNode, createContext, useState } from "react";

export const UserContext = createContext<{
  user: User | null;
  onSignIn: (signInData: SignInData) => void;
  onSignOut: () => void;
  onGetUser: (user: User) => void;
  onEditProfileDetails: (user: User) => void;
  onSubscribePushNotification: () => void;
}>({
  user: null,
  onSignIn: () => {},
  onSignOut: () => {},
  onGetUser: () => {},
  onEditProfileDetails: () => {},
  onSubscribePushNotification: () => {},
});

export function UserProvider({ children }: { children: ReactNode }) {
  const getUser = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  };

  const [user, setUser] = useState<User | null>(getUser());

  const onSignIn = ({ jwt: { accessToken, refreshToken } }: SignInData) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  };

  const onSignOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    setUser(null);
  };

  const onGetUser = (user: User) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
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

  return (
    <UserContext.Provider
      value={{
        user,
        onSignIn,
        onSignOut,
        onGetUser,
        onEditProfileDetails,
        onSubscribePushNotification,
      }}>
      {children}
    </UserContext.Provider>
  );
}
