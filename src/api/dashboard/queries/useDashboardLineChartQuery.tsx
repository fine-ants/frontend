import { useQuery } from "@tanstack/react-query";
import { getTotalValuationLineChart } from "..";
import { dashboardKeys } from "./queryKeys";

export default function useDashboardTotalValuationTrendQuery() {
  return useQuery({
    queryKey: dashboardKeys.lineChart().queryKey,
    queryFn: getTotalValuationLineChart,
    select: (res) => res.data,
    meta: {
      errorMessage: "라인 차트 정보를 불러오는데 실패했습니다",
    },
  });
}
