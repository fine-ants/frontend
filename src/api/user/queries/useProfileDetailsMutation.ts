import { useMutation, useQueryClient } from "@tanstack/react-query";
import { putProfileDetails } from "..";
import { userKeys } from "./queryKeys";

export default function useProfileDetailsMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: putProfileDetails,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.details().queryKey });
    },
    meta: {
      toastSuccessMessage: "프로필 설정을 완료했습니다",
      toastErrorMessage: "프로필 설정을 실패했습니다",
    },
  });
}
