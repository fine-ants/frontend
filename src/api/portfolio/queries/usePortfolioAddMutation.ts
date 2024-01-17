import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { postPortfolio } from "..";
import { portfolioKeys } from "./queryKeys";

type Props = {
  onSuccessCb?: () => void;
};

export default function usePortfolioAddMutation({ onSuccessCb }: Props) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: portfolioKeys.addPortfolio().queryKey,
    mutationFn: postPortfolio,
    onSuccess: ({ data }) => {
      onSuccessCb && onSuccessCb(); // Ex: close dialog

      // Invalidate Portfolio List Queries
      queryClient.invalidateQueries({
        queryKey: [
          portfolioKeys.list("header").queryKey,
          portfolioKeys.list("table").queryKey,
        ],
      });

      navigate(`/portfolio/${data.portfolioId}`);
    },
    meta: {
      toastSuccessMessage: "포트폴리오 추가를 성공했습니다",
    },
  });
}
