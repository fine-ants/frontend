import { useSuspenseQuery } from "@tanstack/react-query";
import { getDashboardOverview } from "..";
import { dashboardKeys } from "./queryKeys";

export default function useDashboardOverviewQuery() {
  return useSuspenseQuery({
    queryKey: dashboardKeys.overview().queryKey,
    queryFn: getDashboardOverview,
    select: (res) => res.data,
    meta: {
      errorMessage: "오버뷰 정보를 불러오는데 실패했습니다",
    },
    retry: 0,
  });
}
