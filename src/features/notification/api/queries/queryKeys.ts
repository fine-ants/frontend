import { createQueryKeys } from "@lukemorales/query-key-factory";

export const notificationKeys = createQueryKeys("notifications", {
  stockNotificationSettings: null,
  specificStockTargetPrices: (tickerSymbol: string) => [tickerSymbol],
  portfolioNotificationSettings: null,
  memberNotifications: null,
});
