import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postWatchlists } from "..";
import { watchlistKeys } from "./queryKeys";

type Props = {
  onCloseDialog: () => void;
};

export default function useWatchlistsAddMutation({ onCloseDialog }: Props) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postWatchlists,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: watchlistKeys.list().queryKey,
      });
      onCloseDialog();
    },
    meta: {
      tostSuccessMessage: "관심 종목 목록을 추가했습니다",
      toastErrorMessage: "관심 종목 목록을 추가하는 중 오류가 발생했습니다",
    },
  });
}
