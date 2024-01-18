import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteWatchlistItem } from "..";
import { watchlistKeys } from "./queryKeys";

export default function useWatchlistItemDeleteMutation(tickerSymbol: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: watchlistKeys.deleteItem(tickerSymbol).queryKey,
    mutationFn: () => deleteWatchlistItem(tickerSymbol),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: watchlistKeys.list().queryKey,
      });
    },
  });
}
