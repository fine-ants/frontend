import { useQuery } from "@tanstack/react-query";

import { getPortfoliosWeightPieChart } from "..";
import { dashboardKeys } from "./queryKeys";

export default function useDashboardPieChartQuery() {
  return useQuery({
    queryKey: dashboardKeys.pieChart().queryKey,
    queryFn: getPortfoliosWeightPieChart,
    select: (res) => res.data,
    meta: {
      errorMessage: "파이 차트 정보를 불러오는데 실패했습니다",
    },
  });
}
