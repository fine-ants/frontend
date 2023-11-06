import { useMutation, useQueryClient } from "@tanstack/react-query";
import { putPortfolio } from "..";
import { portfolioKeys } from "./queryKeys";

export default function usePortfolioEditMutation(portfolioId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: portfolioKeys.details(portfolioId).queryKey,
    mutationFn: putPortfolio,
    onSuccess: () => {
      // TODO: toast
      queryClient.invalidateQueries({
        queryKey: portfolioKeys.details(portfolioId).queryKey,
      });
    },
  });
}
