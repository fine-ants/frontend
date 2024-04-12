import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePortfolioHoldings } from "..";
import { portfolioKeys } from "./queryKeys";

export default function usePortfolioHoldingDeleteMutation(portfolioId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePortfolioHoldings,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: portfolioKeys.details(portfolioId).queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: portfolioKeys.charts(portfolioId).queryKey,
      });
    },
    meta: {
      toastSuccessMessage: "종목을 삭제했습니다",
      toastErrorMessage: "종목 삭제를 실패했습니다",
    },
  });
}
