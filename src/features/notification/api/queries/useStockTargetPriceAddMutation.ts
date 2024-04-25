import { Response } from "@api/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "src/main";
import { postStockPriceTarget } from "..";
import { notificationKeys } from "./queryKeys";

export default function useStockTargetPriceAddMutation(tickerSymbol: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (targetPrice: number) => {
      return postStockPriceTarget({ tickerSymbol, targetPrice: targetPrice });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey:
          notificationKeys.specificStockTargetPrices(tickerSymbol).queryKey,
      });
    },
    onError: (error) => {
      const message = (error as AxiosError<Response<null>>).response?.data
        ?.message as string;
      toast.error(message);
    },
    meta: {
      toastSuccessMessage: "종목 지정가 알림을 추가했습니다",
    },
  });
}
