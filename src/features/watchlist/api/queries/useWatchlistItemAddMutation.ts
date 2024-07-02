import { Response } from "@api/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "src/main";
import { postWatchlistStocks } from "..";
import { watchlistKeys } from "./queryKeys";

export default function useWatchlistItemAddMutation(
  watchlistId: number,
  onSuccessCb?: () => void
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (tickerSymbols: string[]) =>
      postWatchlistStocks({ watchlistId, tickerSymbols }),
    onSuccess: () => {
      onSuccessCb && onSuccessCb();

      queryClient.invalidateQueries({
        queryKey: watchlistKeys.item(watchlistId).queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: watchlistKeys.hasStock.queryKey,
      });
    },
    onError: (error) => {
      const message = (error as AxiosError<Response<null>>).response?.data
        ?.message as string;
      toast.error(message);
    },
    meta: {
      toastSuccessMessage: "관심 종목을 추가했습니다",
    },
  });
}
