import { Response } from "@api/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "src/main";
import { postPortfolioHoldingPurchase } from "..";
import { portfolioKeys } from "./queryKeys";

export default function usePortfolioHoldingPurchaseAddMutation(
  portfolioId: number
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postPortfolioHoldingPurchase,
    onSuccess: () => {
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
    meta: {
      toastSuccessMessage: "매입 이력을 추가했습니다",
    },
  });
}
