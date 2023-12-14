import { useSuspenseQuery } from "@tanstack/react-query";
import { getTotalValuationLineChart } from "..";
import { dashboardKeys } from "./queryKeys";

export default function useDashboardTotalValuationTrendQuery() {
  return useSuspenseQuery({
    queryKey: dashboardKeys.lineChart().queryKey,
    queryFn: getTotalValuationLineChart,
    select: (res) => res.data,
    retry: 0,
  });
}
