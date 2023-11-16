import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postWatchlistItem } from "..";
import { watchlistKeys } from "./queryKeys";

type Props = {
  onCloseDialog: () => void;
};

export default function useWatchlistItemAddMutation({
  onCloseDialog: onCloseDialog,
}: Props) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: watchlistKeys.addItem().queryKey,
    mutationFn: postWatchlistItem,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: watchlistKeys.list().queryKey,
      });
      onCloseDialog();
    },

    // TODO: error handling
  });
}
