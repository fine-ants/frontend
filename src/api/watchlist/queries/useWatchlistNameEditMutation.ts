import { useMutation, useQueryClient } from "@tanstack/react-query";
import { putWatchlistName } from "..";
import { watchlistKeys } from "./queryKeys";

type Props = {
  watchlistId: number;
  onCloseDialog?: () => void;
};

export default function useWatchlistNameEditMutation({
  watchlistId,
  onCloseDialog,
}: Props) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newName: string) =>
      putWatchlistName({ watchlistId, name: newName }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: watchlistKeys.item(watchlistId).queryKey,
      });
      onCloseDialog && onCloseDialog();
    },
  });
}
