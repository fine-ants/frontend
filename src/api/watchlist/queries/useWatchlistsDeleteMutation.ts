import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteWatchlists } from "..";
import { watchlistKeys } from "./queryKeys";

export default function useWatchlistsDeleteMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteWatchlists,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: watchlistKeys.list().queryKey,
      });
    },
    meta: {
      tostSuccessMessage: "관심 종목 목록을 삭제했습니다",
      toastErrorMessage: "관심 종목 목록을 삭제하는 중 오류가 발생했습니다",
    },
  });
}
