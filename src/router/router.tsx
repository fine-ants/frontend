import { User } from "@api/auth";
import { OverviewErrorFallback } from "@components/Dashboard/errorFallback/OverviewErrorFallback";
import { DashboardOverviewSkeleton } from "@components/Dashboard/skeletons/DashboardOverviewSkeleton";
import { AsyncBoundary } from "@components/common/AsyncBoundary";
import { GOOGLE_CLIENT_ID } from "@constants/config";
import { WindowProvider } from "@context/WindowContext";
import DashboardPage from "@pages/DashboardPage";
import GlobalErrorPage from "@pages/GlobalErrorPage";
import IndicesPage from "@pages/IndicesPage";
import LandingPage from "@pages/LandingPage";
import MyProfilePage from "@pages/MyProfilePage";
import NotFoundPage from "@pages/NotFoundPage";
import PortfoliosListPage from "@pages/Portfolio/PortfolioListPage";
import PortfolioPage from "@pages/Portfolio/PortfolioPage";
import SignInLoadingPage from "@pages/SignInLoadingPage";
import SignInPage from "@pages/SignInPage/SignInPage";
import SignUpPage from "@pages/SignUpPage/SignUpPage";
import StockPage from "@pages/StockPage";
import WatchlistPage from "@pages/WatchlistPage";
import { GoogleOAuthProvider } from "@react-oauth/google";
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
          <Route
            path={Routes.PORTFOLIO}
            element={
              <AsyncBoundary
                ErrorFallback={OverviewErrorFallback}
                SuspenseFallback={<DashboardOverviewSkeleton />}>
                <PortfolioPage />
              </AsyncBoundary>
            }
          />
          {/* <Route path={Routes.PORTFOLIOHOLDING} element={<PortfolioHoldingPage />}/> */}
          <Route path={Routes.WATCHLISTS} element={<WatchlistPage />} />
          <Route path={Routes.PROFILE} element={<MyProfilePage />} />
          <Route path={Routes.INDICES} element={<IndicesPage />} />
        </Route>

        <Route
          element={
            <WindowProvider>
              <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                <PublicOnlyRoute user={user} />
              </GoogleOAuthProvider>
            </WindowProvider>
          }>
          <Route index path={Routes.LANDING} element={<LandingPage />} />
          <Route path={Routes.SIGNINLOADING} element={<SignInLoadingPage />} />
          <Route path={Routes.SIGNIN} element={<SignInPage />} />
          <Route path={Routes.SIGNUP} element={<SignUpPage />} />
        </Route>

        <Route path={Routes.STOCK} element={<StockPage />} />
        <Route path={Routes.FALLBACK} element={<NotFoundPage />} />
      </Route>
    )
  );

export default router;
