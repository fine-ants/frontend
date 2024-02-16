import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePortfolioHoldings } from "..";
import { portfolioKeys } from "./queryKeys";

export default function usePortfolioHoldingDeleteMutation(portfolioId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePortfolioHoldings,
    onSuccess: () => {
      // TODO: toast
      queryClient.invalidateQueries({
        queryKey: portfolioKeys.details(portfolioId).queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: portfolioKeys.charts(portfolioId).queryKey,
      });
    },
  });
}
