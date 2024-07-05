import { useMutation, useQueryClient } from "@tanstack/react-query";
import { putPortfolioHoldingPurchase } from "..";
import { portfolioKeys } from "./queryKeys";

export default function usePortfolioHoldingPurchaseEditMutation(
  portfolioId: number
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: putPortfolioHoldingPurchase,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: portfolioKeys.details(portfolioId).queryKey,
      });
    },
    meta: {
      toastSuccessMessage: "매입 이력을 수정했습니다",
      toastErrorMessage: "매입 이력 수정을 실패했습니다",
    },
  });
}
