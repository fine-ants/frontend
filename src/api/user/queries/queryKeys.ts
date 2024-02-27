import { createQueryKeys } from "@lukemorales/query-key-factory";

export const userKeys = createQueryKeys("user", {
  details: () => ({
    queryKey: ["details"],
  }),
});
