import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAccount } from "..";
import { userKeys } from "./queryKeys";

export default function useAccountDeleteMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      queryClient.removeQueries({
        queryKey: userKeys.details().queryKey,
        exact: true,
      });
    },
    meta: {
      toastErrorMessage: "계정 삭제를 실패했습니다",
    },
  });
}
