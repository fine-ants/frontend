import { SignInData, User } from "@api/auth";
import { ReactNode, createContext, useState } from "react";

export const UserContext = createContext<{
  user: User | null;
  onSignIn: (signInData: SignInData) => void;
  onSignOut: () => void;
  onEditProfileDetails: (user: User) => void;
}>({
  user: null,
  onSignIn: () => {},
  onSignOut: () => {},
  onEditProfileDetails: () => {},
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

  return (
    <UserContext.Provider
      value={{ user, onSignIn, onSignOut, onEditProfileDetails }}>
      {children}
    </UserContext.Provider>
  );
}
