import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { postPortfolio } from "..";
import { portfolioKeys } from "./queryKeys";

type Props = {
  onSuccessCb: () => void;
};

export default function usePortfolioAddMutation({ onSuccessCb }: Props) {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: portfolioKeys.addPortfolio().queryKey,
    mutationFn: postPortfolio,
    onSuccess: ({ data }) => {
      // TODO : Toast
      onSuccessCb();
      navigate(`/portfolio/${data.portfolioId}`);
    },
  });
}
