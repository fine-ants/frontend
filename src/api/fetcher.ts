import { refreshAccessToken } from "@api/auth";
import { HTTPSTATUS } from "@api/types";
import { BASE_API_URL } from "@constants/config";
import Routes from "@router/Routes";
import axios from "axios";

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
    // Access token expired. Attempt to refresh it and retry the original request.
    if (
      error.response.status === HTTPSTATUS.forbidden &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const res = await refreshAccessToken();
      localStorage.setItem("accessToken", res.data?.accessToken);
      return fetcher(originalRequest);
    }

    if (error.response.status === HTTPSTATUS.unAuthorized) {
      // Refresh token expired. Log the user out.
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      window.location.href = Routes.SIGNIN;
    }
    return Promise.reject(error);
  }
);
