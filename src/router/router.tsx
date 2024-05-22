import { WindowProvider } from "@context/WindowContext";
import { User } from "@features/user/api/types";
import DashboardPage from "@pages/DashboardPage";
import GlobalErrorPage from "@pages/GlobalErrorPage";
import IndicesPage from "@pages/IndicesPage";
import LandingPage from "@pages/LandingPage";
import NotFoundPage from "@pages/NotFoundPage";
import PortfoliosListPage from "@pages/PortfolioListPage";
import PortfolioPage from "@pages/PortfolioPage";
import StockPage from "@pages/StockPage";
import WatchlistPage from "@pages/WatchlistPage";
import WatchlistsPage from "@pages/WatchlistsPage";
import OAuthLoadingPage from "@pages/auth/OAuthLoadingPage";
import SignInPage from "@pages/auth/SignInPage";
import SignUpPage from "@pages/auth/signup/SignUpPage";
import ActiveNotificationsPage from "@pages/notifications/ActiveNotificationsPage";
import ProfilePage from "@pages/profile/ProfilePage";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import PublicOnlyRoute from "./PublicOnlyRoute";
import Routes from "./Routes";

const router = (user: User | null) =>
  createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" errorElement={<GlobalErrorPage />}>
        <Route element={<ProtectedRoute user={user} />}>
          <Route index path={Routes.DASHBOARD} element={<DashboardPage />} />
          <Route path={Routes.PORTFOLIOS} element={<PortfoliosListPage />} />
          <Route path={Routes.PORTFOLIO()} element={<PortfolioPage />} />
          <Route path={Routes.WATCHLISTS} element={<WatchlistsPage />} />
          <Route path={Routes.WATCHLIST()} element={<WatchlistPage />} />
          <Route
            path={Routes.NOTIFICATIONS()}
            element={<ActiveNotificationsPage />}
          />
          <Route path={Routes.PROFILE()} element={<ProfilePage />} />
        </Route>

        <Route
          element={
            <WindowProvider>
              <PublicOnlyRoute user={user} />
            </WindowProvider>
          }>
          <Route index path={Routes.LANDING} element={<LandingPage />} />
          <Route path={Routes.OAUTHLOADING} element={<OAuthLoadingPage />} />
          <Route path={Routes.SIGNIN} element={<SignInPage />} />
          <Route path={Routes.SIGNUP} element={<SignUpPage />} />
        </Route>

        <Route path={Routes.INDICES()} element={<IndicesPage />} />
        <Route path={Routes.STOCK()} element={<StockPage />} />
        <Route path={Routes.FALLBACK} element={<NotFoundPage />} />
      </Route>
    )
  );

export default router;
