import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { postPortfolio } from "..";
import { portfolioKeys } from "./queryKeys";

type Props = {
  onSuccessCb: () => void;
};

export default function usePortfolioAddMutation({ onSuccessCb }: Props) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postPortfolio,
    onSuccess: ({ data }) => {
      onSuccessCb();

      queryClient.invalidateQueries({
        queryKey: portfolioKeys.list.queryKey,
      });

      navigate(`/portfolio/${data.portfolioId}`);
    },
    meta: {
      toastSuccessMessage: "포트폴리오 추가를 성공했습니다",
      toastErrorMessage: "포트폴리오 추가를 실패했습니다",
    },
  });
}
