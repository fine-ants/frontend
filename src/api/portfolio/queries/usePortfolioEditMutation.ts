import { useMutation, useQueryClient } from "@tanstack/react-query";
import { putPortfolio } from "..";
import { portfolioKeys } from "./queryKeys";

export default function usePortfolioEditMutation(portfolioId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: portfolioKeys.details(portfolioId).queryKey,
    mutationFn: putPortfolio,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: portfolioKeys.details(portfolioId).queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: [portfolioKeys.list().queryKey],
      });
      queryClient.invalidateQueries({
        queryKey: portfolioKeys.charts(portfolioId).queryKey,
      });
    },
    meta: {
      toastSuccessMessage: "포트폴리오 수정을 성공했습니다",
    },
  });
}
