import { useSuspenseQuery } from "@tanstack/react-query";
import { getPortfolioCharts } from "..";
import { portfolioKeys } from "./queryKeys";

export default function usePortfolioHoldingChartsQuery(portfolioId: number) {
  return useSuspenseQuery({
    queryKey: portfolioKeys.charts(portfolioId).queryKey,
    queryFn: () => getPortfolioCharts(portfolioId),
    retry: false,
    select: (res) => res.data,
  });
}
