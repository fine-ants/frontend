import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePortfolios } from "..";
import { portfolioKeys } from "./queryKeys";

export default function usePortfoliosDeleteMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: portfolioKeys.deletePortfolios().queryKey,
    mutationFn: deletePortfolios,
    onSuccess: () => {
      // Invalidate Portfolio List Queries
      queryClient.invalidateQueries({
        queryKey: [
          portfolioKeys.list("header").queryKey,
          portfolioKeys.list("table").queryKey,
        ],
      });
    },
    meta: {
      toastSuccessMessage: "포트폴리오 삭제를 성공했습니다",
    },
  });
}
