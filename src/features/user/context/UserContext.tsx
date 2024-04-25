import { SignInData } from "@features/auth/api";
import { User } from "@features/user/api/types";
import { ReactNode, createContext, useState } from "react";

export const UserContext = createContext<{
  user: User | null;
  fcmTokenId: number | null;
  onSignIn: (signInData: SignInData) => void;
  onSignOut: () => void;
  onGetUser: (user: User) => void;
  onEditProfileDetails: (user: User) => void;
  onSubscribePushNotification: (fcmTokenId: number) => void;
  onUnsubscribePushNotification: () => void;
}>({
  user: null,
  fcmTokenId: null,
  onSignIn: () => {},
  onSignOut: () => {},
  onGetUser: () => {},
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
  const [fcmTokenId, setFcmTokenId] = useState<number | null>(null);

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
    localStorage.setItem("recentlyLoggedInMethod", user.provider);
    setUser(user);
  };

  const onEditProfileDetails = (user: User) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  const onSubscribePushNotification = async (fcmTokenId: number) => {
    setFcmTokenId(fcmTokenId);
  };

  const onUnsubscribePushNotification = async () => {
    setFcmTokenId(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        fcmTokenId,
        onSignIn,
        onSignOut,
        onGetUser,
        onEditProfileDetails,
        onSubscribePushNotification,
        onUnsubscribePushNotification,
      }}>
      {children}
    </UserContext.Provider>
  );
}
