import { createQueryKeys } from "@lukemorales/query-key-factory";

export const notificationKeys = createQueryKeys("notifications", {
  memberNotifications: () => ({
    queryKey: ["memberNotifications"],
  }),
});
