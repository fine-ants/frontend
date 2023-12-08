import { User } from "@api/auth";
import { GOOGLE_CLIENT_ID } from "@constants/config";
import { WindowProvider } from "@context/WindowContext";
import DashboardPage from "@pages/DashboardPage";
import IndicesPage from "@pages/IndicesPage";
import LandingPage from "@pages/LandingPage";
import MyProfilePage from "@pages/MyProfilePage";
import PortfoliosListPage from "@pages/Portfolio/PortfolioListPage";
import PortfolioPage from "@pages/Portfolio/PortfolioPage";
import SignInPage from "@pages/SignInPage";
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
      <Route path="/">
        <Route element={<ProtectedRoute user={user} />}>
          <Route index path={Routes.DASHBOARD} element={<DashboardPage />} />
          <Route path={Routes.PORTFOLIOS} element={<PortfoliosListPage />} />
          <Route path={Routes.PORTFOLIO} element={<PortfolioPage />} />
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
          <Route path={Routes.SIGNIN} element={<SignInPage />} />
          <Route path={Routes.SIGNUP} element={<SignUpPage />} />
        </Route>

        <Route path={Routes.STOCK} element={<StockPage />} />
        {/* <Route path={Routes.FALLBACK} element={<NotFoundPage />}/> */}
      </Route>
    )
  );

export default router;
