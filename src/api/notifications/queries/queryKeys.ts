import { createQueryKeys } from "@lukemorales/query-key-factory";

export const notificationKeys = createQueryKeys("notifications", {
  stockNotificationSettings: () => ({
    queryKey: ["stockNotificationSettings"],
  }),
  portfolioNotificationSettings: () => ({
    queryKey: ["portfolioNotificationSettings"],
  }),
  memberNotifications: () => ({
    queryKey: ["memberNotifications"],
  }),
});
