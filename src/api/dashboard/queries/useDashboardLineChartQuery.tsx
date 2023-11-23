import { useQuery } from "@tanstack/react-query";
import { getTotalValuationLineChart } from "..";
import { dashboardKeys } from "./queryKeys";

export default function useDashboardLineChartQuery() {
  return useQuery({
    queryKey: dashboardKeys.lineChart().queryKey,
    queryFn: getTotalValuationLineChart,
    select: (res) => res.data,
  });
}
