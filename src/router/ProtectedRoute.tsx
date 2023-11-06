import { User } from "api/auth";
import { Navigate, Outlet } from "react-router-dom";
import Routes from "./Routes";

export default function ProtectedRoute({ user }: { user: User | null }) {
  return user ? <Outlet /> : <Navigate to={Routes.SIGNIN} />;
}
