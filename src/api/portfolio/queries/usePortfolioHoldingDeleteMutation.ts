import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePortfolioHolding } from "..";
import { portfolioKeys } from "./queryKeys";

export default function usePortfolioHoldingDeleteMutation(portfolioId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: portfolioKeys.deleteHolding(portfolioId).queryKey,
    mutationFn: deletePortfolioHolding,
    onSuccess: () => {
      // TODO: toast
      queryClient.invalidateQueries({
        queryKey: portfolioKeys.details(portfolioId).queryKey,
      });
    },
  });
}
