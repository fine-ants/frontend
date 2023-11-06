export const CLIENT_URL =
  process.env.NODE_ENV === "production"
    ? import.meta.env.VITE_CLIENT_URL_PROD
    : import.meta.env.VITE_CLIENT_URL_DEV;

export const BASE_API_URL =
  process.env.NODE_ENV === "production"
    ? import.meta.env.VITE_API_URL_PROD
    : import.meta.env.VITE_API_URL_DEV;

export const BASE_API_URL_WS =
  process.env.NODE_ENV === "production"
    ? import.meta.env.VITE_API_URL_PROD_WS
    : import.meta.env.VITE_API_URL_DEV_WS;

export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export const KAKAO_CLIENT_ID = import.meta.env.VITE_KAKAO_CLIENT_ID;

export const NAVER_CLIENT_ID = import.meta.env.VITE_NAVER_CLIENT_ID;
