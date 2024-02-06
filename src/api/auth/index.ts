import { Response } from "@api/types";
import { User } from "@api/user/types";
import { CLIENT_URL } from "@constants/config";
import { fetcher } from "../fetcher";

export type SignInCredentials = {
  email: string;
  password: string;
};

export type SignInData = {
  jwt: {
    accessToken: string;
    refreshToken: string;
  };
  user: User;
};

export type SignUpData = {
  [key: string]: string | File | null;
  nickname: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export type OAuthProvider = "google" | "naver" | "kakao";

type AccessTokenData = {
  accessToken: string;
};

export const postSignUp = async (body: FormData) => {
  const res = await fetcher.post<Response<null>>("/auth/signup", body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const postSignIn = async (body: SignInCredentials) => {
  const res = await fetcher.post<Response<SignInData>>("/auth/login", body);
  return res.data;
};

// Receive OAuth URL from server
export const postOAuthUrl = async (provider: OAuthProvider) => {
  const res = await fetcher.post<Response<{ authURL: string }>>(
    `/auth/${provider}/authUrl`
  );

  if (process.env.NODE_ENV === "development") {
    const tempURL = new URL(res.data.data.authURL);
    tempURL.searchParams.set(
      "redirect_uri",
      `http://localhost:5173/signin/loading?provider=${provider}`
    );
    res.data.data.authURL = tempURL.toString();
  }

  return res.data;
};

export const postOAuthSignIn = async (
  provider: OAuthProvider,
  authCode: string,
  state: string
) => {
  const res = await fetcher.post<Response<SignInData>>(
    `/auth/${provider}/login?code=${authCode}&state=${state}&redirectUrl=${CLIENT_URL}/signin/loading?provider=${provider}`
  );
  return res.data;
};

export const postSignOut = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  const res = await fetcher.post<Response<null>>("/auth/logout", {
    refreshToken,
  });
  return res.data;
};

export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  const res = await fetcher.post<Response<AccessTokenData>>(
    "/auth/refresh/token",
    { refreshToken }
  );
  return res.data;
};

export const patchUserInfo = async (body: FormData) => {
  const res = await fetcher.patch<Response<null>>("/users/info", body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const postNicknameDuplicateCheck = async (nickname: string) => {
  const res = await fetcher.get<Response<null>>(
    `/auth/signup/duplicationcheck/nickname/${nickname}`
  );
  return res.data;
};

export const postEmailDuplicateCheck = async (email: string) => {
  const res = await fetcher.get<Response<null>>(
    `/auth/signup/duplicationcheck/email/${email}`
  );
  return res.data;
};

export const postEmailVerification = async (email: string) => {
  const res = await fetcher.post<Response<null>>("/auth/signup/verifyEmail", {
    email,
  });
  return res.data;
};

export const postEmailCodeVerification = async ({
  email,
  code,
}: {
  email: string;
  code: string;
}) => {
  const res = await fetcher.post("/auth/signup/verifyCode", {
    email,
    code,
  });
  return res.data;
};
