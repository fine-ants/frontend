import { useSuspenseQuery } from "@tanstack/react-query";
import { getPortfolioNotificationSettings } from "..";
import { notificationKeys } from "./queryKeys";

export default function usePortfolioNotificationSettingsQuery() {
  return useSuspenseQuery({
    queryKey: notificationKeys.portfolioNotificationSettings().queryKey,
    queryFn: getPortfolioNotificationSettings,
    retry: false,
    select: (res) => res.data.portfolios,
  });
}
