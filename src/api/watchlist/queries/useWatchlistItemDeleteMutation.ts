import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteWatchlistStock } from "..";
import { watchlistKeys } from "./queryKeys";

export default function useWatchlistItemDeleteMutation(watchlistId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: watchlistKeys.deleteStock(watchlistId).queryKey,
    mutationFn: (tickerSymbols: string[]) =>
      deleteWatchlistStock({ watchlistId, tickerSymbols }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: watchlistKeys.item(watchlistId).queryKey,
      });
    },
  });
}
