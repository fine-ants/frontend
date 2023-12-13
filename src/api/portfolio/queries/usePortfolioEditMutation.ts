import { useMutation, useQueryClient } from "@tanstack/react-query";
import { putPortfolio } from "..";
import { portfolioKeys } from "./queryKeys";

export default function usePortfolioEditMutation(portfolioId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: portfolioKeys.details(portfolioId).queryKey,
    mutationFn: putPortfolio,
    onSuccess: () => {
      // Invalidate Portfolio Details Query
      queryClient.invalidateQueries({
        queryKey: portfolioKeys.details(portfolioId).queryKey,
      });

      // Invalidate Portfolio List Queries
      queryClient.invalidateQueries({
        queryKey: [
          portfolioKeys.list("header").queryKey,
          portfolioKeys.list("table").queryKey,
        ],
      });
    },
    meta: {
      successMessage: "포트폴리오 수정을 성공했습니다",
    },
  });
}
