import { useQuery } from "@tanstack/react-query";
import { getDashboardOverview } from "..";
import { dashboardKeys } from "./queryKeys";

export default function useDashboardOverviewQuery() {
  return useQuery({
    queryKey: dashboardKeys.overview().queryKey,
    queryFn: getDashboardOverview,
    select: (res) => res.data,
  });
}
