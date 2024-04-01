import { Response } from "@api/types";
import { createToast } from "@components/common/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { postPortfolioHoldingPurchase } from "..";
import { portfolioKeys } from "./queryKeys";

export default function usePortfolioHoldingPurchaseAddMutation(
  portfolioId: number
) {
  const queryClient = useQueryClient();
  const toast = createToast();

  return useMutation({
    mutationFn: postPortfolioHoldingPurchase,
    onSuccess: () => {
      // TODO: toast
      queryClient.invalidateQueries({
        queryKey: portfolioKeys.details(portfolioId).queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: portfolioKeys.charts(portfolioId).queryKey,
      });
    },
    onError: (error) => {
      const message = (error as AxiosError<Response<null>>).response?.data
        ?.message as string;
      toast.error(message);
    },
  });
}
