import { User } from "@api/auth";
import { fetcher } from "@api/fetcher";
import { Response } from "@api/types";

export const putProfileDetails = async (body: FormData) => {
  const res = await fetcher.put<Response<User>>("/profile", body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
