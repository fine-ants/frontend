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
    meta: {
      toastSuccessMessage: "성공적으로 이름이 변경되었습니다",
      toastErrorMessage: "이름 변경에 실패했습니다",
    },
  });
}
