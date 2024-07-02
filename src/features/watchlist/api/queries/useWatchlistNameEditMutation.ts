import { useMutation, useQueryClient } from "@tanstack/react-query";
import { putWatchlistName } from "..";
import { watchlistKeys } from "./queryKeys";

export default function useWatchlistNameEditMutation(
  watchlistId: number,
  onSuccessCb?: () => void
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newName: string) =>
      putWatchlistName({ watchlistId, name: newName }),
    onSuccess: () => {
      onSuccessCb && onSuccessCb();

      queryClient.invalidateQueries({
        queryKey: watchlistKeys.item(watchlistId).queryKey,
      });
    },
    meta: {
      toastSuccessMessage: "와치리스트 이름이 변경되었습니다.",
      toastErrorMessage: "와치리스트 이름 변경을 실패했습니다",
    },
  });
}
