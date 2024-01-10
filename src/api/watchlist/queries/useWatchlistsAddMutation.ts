import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postWatchlists } from "..";
import { watchlistKeys } from "./queryKeys";

type Props = {
  onCloseDialog: () => void;
};

export default function useWatchlistsAddMutation({ onCloseDialog }: Props) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: watchlistKeys.addList().queryKey,
    mutationFn: postWatchlists,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: watchlistKeys.list().queryKey,
      });
      onCloseDialog();
    },

    // TODO: error handling
  });
}
