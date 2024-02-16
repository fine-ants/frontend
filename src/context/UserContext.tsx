import { SignInData } from "@api/auth";
import { User } from "@api/user/types";
import { ReactNode, createContext, useState } from "react";

export const UserContext = createContext<{
  user: User | null;
  fcmTokenId: number | null;
  onSignIn: (signInData: SignInData) => void;
  onSignOut: () => void;
  onGetUser: (user: User) => void;
  onEditProfileDetails: (user: User) => void;
  onSubscribePushNotification: (fcmTokenId: number) => void;
  onUnSubscribePushNotification: () => void;
}>({
  user: null,
  fcmTokenId: null,
  onSignIn: () => {},
  onSignOut: () => {},
  onGetUser: () => {},
  onEditProfileDetails: () => {},
  onSubscribePushNotification: () => {},
  onUnSubscribePushNotification: () => {},
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
    setUser(user);
  };

  const onEditProfileDetails = (user: User) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  const onSubscribePushNotification = async (fcmTokenId: number) => {
    setFcmTokenId(fcmTokenId);
  };

  const onUnSubscribePushNotification = async () => {
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
        onUnSubscribePushNotification,
      }}>
      {children}
    </UserContext.Provider>
  );
}
