import { useQuery } from "@tanstack/react-query";
import { getPortfoliosList } from "..";
import { portfolioKeys } from "./queryKeys";

/**
 * This is a react-query hook that fetches the portfolio list data.
 *
 * This should be used in components that do not use Suspense (Ex: portfolio list dropdown in the Header).
 *
 * When you need to invalidate this query, make sure to also invalidate `usePortfolioListTableQuery`.
 */
export default function usePortfolioListHeaderQuery() {
  return useQuery({
    queryKey: portfolioKeys.list("header").queryKey,
    queryFn: getPortfoliosList,
    retry: false,
    enabled: false,
    select: (res) => res.data,
  });
}
