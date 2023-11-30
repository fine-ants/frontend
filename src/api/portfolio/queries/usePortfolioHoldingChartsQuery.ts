import { useSuspenseQuery } from "@tanstack/react-query";
import { getPortfolioCharts } from "..";
import { portfolioKeys } from "./queryKeys";

export default function usePortfolioHoldingChartsQuery(portfolioId: number) {
  return useSuspenseQuery({
    queryKey: portfolioKeys.charts(portfolioId).queryKey,
    queryFn: () => getPortfolioCharts(portfolioId),
    retry: false,
    select: (res) => res.data,
    meta: {
      errorMessage: "포트폴리오 차트 정보를 불러오는데 실패했습니다",
    },
  });
}
