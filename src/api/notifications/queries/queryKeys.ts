import { createQueryKeys } from "@lukemorales/query-key-factory";

export const notificationKeys = createQueryKeys("notifications", {
  stockNotificationSettings: () => ({
    queryKey: ["stockNotificationSettings"],
  }),
  specificStockTargetPrices: (tickerSymbol: string) => ({
    queryKey: [tickerSymbol],
  }),
  portfolioNotificationSettings: () => ({
    queryKey: ["portfolioNotificationSettings"],
  }),
  memberNotifications: () => ({
    queryKey: ["memberNotifications"],
  }),
});
