import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postWatchlistStock } from "..";
import { watchlistKeys } from "./queryKeys";

type Props = {
  watchlistId: number;
  onCloseDialog: () => void;
};

export default function useWatchlistItemAddMutation({
  watchlistId,
  onCloseDialog,
}: Props) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: watchlistKeys.addStock(watchlistId).queryKey,
    mutationFn: (tickerSymbols: string[]) =>
      postWatchlistStock({ watchlistId, tickerSymbols }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: watchlistKeys.item(watchlistId).queryKey,
      });
      onCloseDialog();
    },
  });
}
