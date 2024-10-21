import { useSuspenseQuery } from "@tanstack/react-query";
import { getPortfoliosNameList } from "..";
import { portfolioKeys } from "./queryKeys";

export default function usePortfolioListQuery() {
  return useSuspenseQuery({
    queryKey: portfolioKeys.list.queryKey,
    queryFn: getPortfoliosNameList,
    retry: false,
    select: (res) => res.data.portfolios,
  });
}
