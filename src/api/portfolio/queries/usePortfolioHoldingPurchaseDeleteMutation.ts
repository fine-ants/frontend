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
    mutationKey: portfolioKeys.editHoldingPurchase(filters).queryKey,
    mutationFn: deletePortfolioHoldingPurchase,
    onSuccess: () => {
      // TODO: toast
      queryClient.invalidateQueries({
        queryKey: portfolioKeys.details(filters.portfolioId).queryKey,
      });
    },
  });
}
