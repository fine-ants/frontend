import { User } from "api/auth";
import { Navigate, Outlet } from "react-router-dom";
import Routes from "./Routes";

export default function PublicOnlyRoute({ user }: { user: User | null }) {
  return user ? <Navigate to={Routes.DASHBOARD} /> : <Outlet />;
}
