import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postPortfolioHolding } from "..";
import { portfolioKeys } from "./queryKeys";

type Props = {
  portfolioId: number;
  onClose: () => void;
};

export default function usePortfolioHoldingAddMutation({
  portfolioId,
  onClose,
}: Props) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: portfolioKeys.addHolding(portfolioId).queryKey,
    mutationFn: postPortfolioHolding,
    onSuccess: () => {
      // TODO: toast
      queryClient.invalidateQueries({
        queryKey: portfolioKeys.details(portfolioId).queryKey,
      });
      onClose();
    },
    onError: (error) => {
      // eslint-disable-next-line no-console
      console.error(error);
    },
  });
}
