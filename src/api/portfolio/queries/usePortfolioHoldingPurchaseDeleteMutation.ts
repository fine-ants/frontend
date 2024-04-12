import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePortfolioHoldingPurchase } from "..";
import { portfolioKeys } from "./queryKeys";

export default function usePortfolioHoldingPurchaseDeleteMutation(filters: {
  portfolioId: number;
  portfolioHoldingId: number;
  purchaseHistoryId: number;
}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePortfolioHoldingPurchase,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: portfolioKeys.details(filters.portfolioId).queryKey,
      });
    },
    meta: {
      toastSuccessMessage: "매입 이력을 삭제했습니다",
      toastErrorMessage: "매입 이력 삭제를 실패했습니다",
    },
  });
}
