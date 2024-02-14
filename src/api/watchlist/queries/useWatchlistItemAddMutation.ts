import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postWatchlistStock } from "..";
import { watchlistKeys } from "./queryKeys";

type Props = {
  watchlistId: number;
  onCloseDialog?: () => void;
};

export default function useWatchlistItemAddMutation({
  watchlistId,
  onCloseDialog,
}: Props) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (tickerSymbols: string[]) =>
      postWatchlistStock({ watchlistId, tickerSymbols }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: watchlistKeys.item(watchlistId).queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: watchlistKeys.hasStock().queryKey,
      });
      onCloseDialog && onCloseDialog();
    },
    meta: {
      toastSuccessMessage: "관심 종목을 추가했습니다",
      toastErrorMessage: "관심 종목을 추가하는 중 오류가 발생했습니다",
    },
  });
}
