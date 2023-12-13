import { useSuspenseQuery } from "@tanstack/react-query";
import { getPortfoliosList } from "..";
import { portfolioKeys } from "./queryKeys";

/**
 * This is a react-query hook that fetches the portfolio list data.
 *
 * This should be used in components that use Suspense (Ex: portfolio list table).
 *
 * When you need to invalidate this query, make sure to also invalidate `usePortfolioListHeadQuery`.
 */
export default function usePortfolioListTableQuery() {
  return useSuspenseQuery({
    queryKey: portfolioKeys.list("table").queryKey,
    queryFn: getPortfoliosList,
    retry: false,
    select: (res) => res.data,
    meta: {
      errorMessage: "포트폴리오 목록을 불러오는데 실패했습니다",
    },
  });
}
