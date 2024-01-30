import { User } from "@api/auth";
import { fetcher } from "@api/fetcher";
import { Response } from "@api/types";

export const putProfileDetails = async (body: FormData) => {
  const res = await fetcher.put<Response<{ user: User }>>("/profile", body, {
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
  const res = await fetcher.delete<Response<null>>("/account", {
    data: { refreshToken: localStorage.getItem("refreshToken") },
  });
  return res.data;
};