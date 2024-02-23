import { useSuspenseQuery } from "@tanstack/react-query";
import { getStockNotificationSettings } from "..";
import { notificationKeys } from "./queryKeys";

export default function useStockNotificationSettingsQuery() {
  return useSuspenseQuery({
    queryKey: notificationKeys.stockNotificationSettings().queryKey,
    queryFn: getStockNotificationSettings,
    retry: false,
    select: (res) => res.data.stocks,
  });
}
