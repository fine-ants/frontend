import Routes from "@router/Routes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { deleteWatchlists } from "..";
import { watchlistKeys } from "./queryKeys";

export default function useWatchlistsDeleteMutation(onSuccessCb?: () => void) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteWatchlists,
    onSuccess: () => {
      onSuccessCb && onSuccessCb();

      queryClient.invalidateQueries({
        queryKey: watchlistKeys.list.queryKey,
      });

      navigate(Routes.WATCHLISTS);
    },
    meta: {
      toastSuccessMessage: "관심 종목 목록을 삭제했습니다",
      toastErrorMessage: "관심 종목 목록을 삭제하는 중 오류가 발생했습니다",
    },
  });
}
