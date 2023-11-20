import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteWatchlistItem } from "..";
import { watchlistKeys } from "./queryKeys";

type Props = {
  onCloseDialog: () => void;
  tickerSymbol: string;
};

export default function useWatchlistItemDeleteMutation({
  onCloseDialog: onCloseDialog,
  tickerSymbol,
}: Props) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: watchlistKeys.deleteItem(tickerSymbol).queryKey,
    mutationFn: () => deleteWatchlistItem(tickerSymbol),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: watchlistKeys.list().queryKey,
      });
      onCloseDialog();
    },
  });
}
