import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePortfolio } from "..";
import { portfolioKeys } from "./queryKeys";

export default function usePortfolioDeleteMutation(portfolioId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: portfolioKeys.details(portfolioId).queryKey,
    mutationFn: deletePortfolio,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [portfolioKeys.list().queryKey],
      });
    },
    meta: {
      toastSuccessMessage: "포트폴리오 삭제를 성공했습니다",
    },
  });
}
