import { User } from "@api/user/types";
import Header from "@components/common/Header/Header";
import { Navigate, Outlet } from "react-router-dom";
import Routes from "./Routes";

export default function ProtectedRoute({ user }: { user: User | null }) {
  return user ? (
    <>
      <Header />
      <Outlet />
    </>
  ) : (
    <Navigate to={Routes.SIGNIN} />
  );
}
