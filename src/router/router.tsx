import { User } from "@api/user/types";
import { WindowProvider } from "@context/WindowContext";
import ActiveNotificationsPage from "@pages/ActiveNotificationsPage/ActiveNotificationsPage";
import DashboardPage from "@pages/DashboardPage";
import GlobalErrorPage from "@pages/GlobalErrorPage";
import IndicesPage from "@pages/IndicesPage";
import LandingPage from "@pages/LandingPage";
import NotFoundPage from "@pages/NotFoundPage";
import PortfoliosListPage from "@pages/Portfolio/PortfolioListPage";
import PortfolioPage from "@pages/Portfolio/PortfolioPage";
import ProfilePage from "@pages/ProfilePage/ProfilePage";
import SignInLoadingPage from "@pages/SignInPage/SignInLoadingPage";
import SignInPage from "@pages/SignInPage/SignInPage";
import SignUpPage from "@pages/SignUpPage/SignUpPage";
import StockPage from "@pages/StockPage";
import WatchlistPage from "@pages/Watchlist/WatchlistPage";
import WatchlistsPage from "@pages/Watchlist/WatchlistsPage";
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
          <Route path={Routes.PORTFOLIO} element={<PortfolioPage />} />
          {/* <Route path={Routes.PORTFOLIOHOLDING} element={<PortfolioHoldingPage />}/> */}
          <Route path={Routes.WATCHLISTS} element={<WatchlistsPage />} />
          <Route path={Routes.WATCHLIST} element={<WatchlistPage />} />
          <Route
            path={Routes.NOTIFICATIONS}
            element={<ActiveNotificationsPage />}
          />
          <Route path={Routes.PROFILE} element={<ProfilePage />} />
        </Route>

        <Route
          element={
            <WindowProvider>
              <PublicOnlyRoute user={user} />
            </WindowProvider>
          }>
          <Route index path={Routes.LANDING} element={<LandingPage />} />
          <Route path={Routes.SIGNINLOADING} element={<SignInLoadingPage />} />
          <Route path={Routes.SIGNIN} element={<SignInPage />} />
          <Route path={Routes.SIGNUP} element={<SignUpPage />} />
        </Route>
        <Route path={Routes.INDICES} element={<IndicesPage />} />
        <Route path={Routes.STOCK} element={<StockPage />} />
        <Route path={Routes.FALLBACK} element={<NotFoundPage />} />
      </Route>
    )
  );

export default router;
