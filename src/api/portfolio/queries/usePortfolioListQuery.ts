import { useSuspenseQuery } from "@tanstack/react-query";
import { getPortfoliosList } from "..";
import { portfolioKeys } from "./queryKeys";

export default function usePortfolioListQuery() {
  return useSuspenseQuery({
    queryKey: portfolioKeys.list().queryKey,
    queryFn: getPortfoliosList,
    retry: false,
    select: (res) => res.data,
    meta: {
      errorMessage: "포트폴리오 목록을 불러오는데 실패했습니다",
    },
  });
}
