import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteWatchlistStocks } from "..";
import { watchlistKeys } from "./queryKeys";

export default function useWatchlistItemDeleteMutation(
  watchlistId: number,
  onSuccessCb?: () => void
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (tickerSymbols: string[]) =>
      deleteWatchlistStocks({ watchlistId, tickerSymbols }),
    onSuccess: () => {
      onSuccessCb && onSuccessCb();

      queryClient.invalidateQueries({
        queryKey: watchlistKeys.item(watchlistId).queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: watchlistKeys.hasStock.queryKey,
      });
    },
    meta: {
      toastSuccessMessage: "관심 종목을 삭제했습니다",
      toastErrorMessage: "관심 종목을 삭제하는 중 오류가 발생했습니다",
    },
  });
}
