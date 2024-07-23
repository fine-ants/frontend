import { HTTPSTATUS } from "@api/types";
import { BASE_API_URL } from "@constants/config";
import Routes from "@router/Routes";
import axios from "axios";

export const fetcher = axios.create({
  baseURL: `${BASE_API_URL}/api`,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export const fetcherWithoutCredentials = axios.create({
  baseURL: `${BASE_API_URL}/api`,
  headers: { "Content-Type": "application/json" },
});

fetcher.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response.status === HTTPSTATUS.unAuthorized) {
      // Refresh token expired. Log the user out.
      localStorage.removeItem("user");

      window.location.href = Routes.SIGNIN;
    }
    return Promise.reject(error);
  }
);
