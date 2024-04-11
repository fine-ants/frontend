import { useSuspenseQuery } from "@tanstack/react-query";
import { getPortfoliosWeightPieChart } from "..";
import { dashboardKeys } from "./queryKeys";

export default function useDashboardPieChartQuery() {
  return useSuspenseQuery({
    queryKey: dashboardKeys.pieChart.queryKey,
    queryFn: getPortfoliosWeightPieChart,
    select: (res) => res.data,
    retry: 0,
  });
}
