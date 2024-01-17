import { createQueryKeys } from "@lukemorales/query-key-factory";

export const settingsKeys = createQueryKeys("settings", {
  profileEdit: () => ({
    queryKey: ["profileEdit"],
  }),
});
