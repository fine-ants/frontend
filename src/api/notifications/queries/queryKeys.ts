import { createQueryKeys } from "@lukemorales/query-key-factory";

export const notificationKeys = createQueryKeys("notifications", {
  portfolioNotificationSettings: () => ({
    queryKey: ["portfolioNotificationSettings"],
  }),
  memberNotifications: () => ({
    queryKey: ["memberNotifications"],
  }),
});
