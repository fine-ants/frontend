import { useMutation, useQueryClient } from "@tanstack/react-query";
import { putPortfolioHoldingPurchase } from "..";
import { portfolioKeys } from "./queryKeys";

export default function usePortfolioHoldingPurchaseEditMutation(filters: {
  portfolioId: number;
  portfolioHoldingId: number;
  purchaseHistoryId: number;
}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: putPortfolioHoldingPurchase,
    onSuccess: () => {
      // TODO: toast
      queryClient.invalidateQueries({
        queryKey: portfolioKeys.details(filters.portfolioId).queryKey,
      });
    },
    meta: {
      toastSuccessMessage: "매입 이력을 수정했습니다",
      toastErrorMessage: "매입 이력 수정을 실패했습니다",
    },
  });
}
