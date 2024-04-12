import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePortfolios } from "..";
import { portfolioKeys } from "./queryKeys";

export default function usePortfoliosDeleteMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePortfolios,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: portfolioKeys.list.queryKey,
      });
    },
    meta: {
      toastSuccessMessage: "포트폴리오 삭제를 성공했습니다",
      toastErrorMessage: "포트폴리오 삭제를 실패했습니다",
    },
  });
}
