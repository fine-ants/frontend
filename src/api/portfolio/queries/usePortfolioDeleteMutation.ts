import { useMutation } from "@tanstack/react-query";
import { deletePortfolio } from "..";
import { portfolioKeys } from "./queryKeys";

export default function usePortfolioDeleteMutation(portfolioId: number) {
  return useMutation({
    mutationKey: portfolioKeys.details(portfolioId).queryKey,
    mutationFn: deletePortfolio,
    onSuccess: () => {
      // TODO: toast, 포트폴리오 목록 query invalidate
    },
  });
}
