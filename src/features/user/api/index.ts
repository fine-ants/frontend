import { fetcher } from "@api/fetcher";
import { Response } from "@api/types";
import { User } from "./types";

export const getUser = async () => {
  const res = await fetcher.get<Response<{ user: User }>>("/profile");
  return res.data;
};

export const postProfileDetails = async (body: FormData) => {
  const res = await fetcher.post<Response<{ user: User }>>("/profile", body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
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

export const putNewPassword = async (body: {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}) => {
  const res = await fetcher.put<Response<null>>("/account/password", body);
  return res.data;
};

export const deleteAccount = async () => {
  const res = await fetcher.delete<Response<null>>("/account");
  return res.data;
};
