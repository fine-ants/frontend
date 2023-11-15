import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postWatchlistItem } from "..";
import { watchlistKeys } from "./queryKeys";

type Props = {
  onCloseModal: () => void;
};

export default function useWatchlistItemAddMutation({ onCloseModal }: Props) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: watchlistKeys.addItem().queryKey,
    mutationFn: postWatchlistItem,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: watchlistKeys.list().queryKey,
      });
      onCloseModal();
    },

    // TODO: error handling
  });
}
