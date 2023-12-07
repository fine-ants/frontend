import { useSuspenseQuery } from "@tanstack/react-query";
import { getPortfoliosList } from "..";
import { portfolioKeys } from "./queryKeys";

export default function usePortfolioListQuery(shouldNotFetch?: boolean) {
  return useSuspenseQuery({
    queryKey: portfolioKeys.list().queryKey,
    queryFn: () => {
      if (shouldNotFetch) {
        return {
          code: 200,
          status: "",
          message: "",
          data: { portfolios: [] },
        };
      }
      return getPortfoliosList();
    },
    retry: false,
    select: (res) => res.data,
    meta: {
      errorMessage: "포트폴리오 목록을 불러오는데 실패했습니다",
    },
  });
}
