import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteWatchlists } from "..";
import { watchlistKeys } from "./queryKeys";

export default function useWatchlistsDeleteMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: watchlistKeys.deleteList().queryKey,
    mutationFn: deleteWatchlists,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: watchlistKeys.list().queryKey,
      });
    },
  });
}
