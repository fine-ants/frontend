import { BASE_API_URL } from "@constants/config";
import { refreshAccessToken } from "api/auth";
import { HTTPSTATUS } from "api/types";
import axios from "axios";
import Routes from "router/Routes";

export const fetcher = axios.create({
  baseURL: `${BASE_API_URL}/api`,
  headers: { "Content-Type": "application/json" },
});

fetcher.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

fetcher.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    // If the access token expired, attempt to refresh it.
    if (
      error.response.status === HTTPSTATUS.forbidden &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const res = await refreshAccessToken();
        localStorage.setItem("accessToken", res.data?.accessToken);
        return fetcher(originalRequest);
      } catch (refreshError) {
        // Refresh token expired.
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        // TODO: navigate the user to `/signin` while displaying the toast
        window.location.href = Routes.SIGNIN;
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
