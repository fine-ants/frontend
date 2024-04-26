import Header from "@components/Header/Header";
import { User } from "@features/user/api/types";
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
