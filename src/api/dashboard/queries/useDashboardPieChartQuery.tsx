import { useQuery } from "@tanstack/react-query";

import { getPortfolioPieChart } from "..";
import { dashboardKeys } from "./queryKeys";

export default function useDashboardPieChartQuery() {
  return useQuery({
    queryKey: dashboardKeys.pieChart().queryKey,
    queryFn: getPortfolioPieChart,
    select: (res) => res.data,
  });
}
