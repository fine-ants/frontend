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
    mutationKey: portfolioKeys.editHoldingPurchase(filters).queryKey,
    mutationFn: putPortfolioHoldingPurchase,
    onSuccess: () => {
      // TODO: toast
      queryClient.invalidateQueries({
        queryKey: portfolioKeys.details(filters.portfolioId).queryKey,
      });
    },
  });
}
