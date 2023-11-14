import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postWatchlist } from "..";
import { watchlistKeys } from "./queryKeys";

type Props = {
  onClose: () => void;
};

export default function useWatchlistItemAddMutation({ onClose }: Props) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: watchlistKeys.addItem().queryKey,
    mutationFn: postWatchlist,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: watchlistKeys.total().queryKey,
      });
      onClose();
    },
    onError: (error) => {
      // eslint-disable-next-line no-console
      console.error(error);
    },
  });
}
