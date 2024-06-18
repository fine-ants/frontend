import { fetcher, fetcherWithoutCredentials } from "@api/fetcher";
import { Response } from "@api/types";

export type SignInCredentials = {
  email: string;
  password: string;
};

export type SignInData = {
  jwt: {
    accessToken: string;
    refreshToken: string;
  };
};

export type SignUpData = {
  [key: string]: string | File | null;
  nickname: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export type OAuthProvider = "google" | "naver" | "kakao";

export const postSignUp = async (body: FormData) => {
  const res = await fetcherWithoutCredentials.post<Response<null>>(
    "/auth/signup",
    body,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return res.data;
};

export const postSignIn = async (body: SignInCredentials) => {
  const res = await fetcher.post<Response<SignInData>>("/auth/login", body);
  return res.data;
};

export const postSignOut = async () => {
  const res =
    await fetcherWithoutCredentials.post<Response<null>>("/auth/logout");
  return res.data;
};

export const postNicknameDuplicateCheck = async (nickname: string) => {
  const res = await fetcherWithoutCredentials.get<Response<null>>(
    `/auth/signup/duplicationcheck/nickname/${nickname}`
  );
  return res.data;
};

export const postEmailDuplicateCheck = async (email: string) => {
  const res = await fetcherWithoutCredentials.get<Response<null>>(
    `/auth/signup/duplicationcheck/email/${email}`
  );
  return res.data;
};

export const postEmailVerification = async (email: string) => {
  const res = await fetcherWithoutCredentials.post<Response<null>>(
    "/auth/signup/verifyEmail",
    {
      email,
    }
  );
  return res.data;
};

export const postEmailCodeVerification = async ({
  email,
  code,
}: {
  email: string;
  code: string;
}) => {
  const res = await fetcherWithoutCredentials.post("/auth/signup/verifyCode", {
    email,
    code,
  });
  return res.data;
};
