import { createQueryKeys } from "@lukemorales/query-key-factory";

export const userKeys = createQueryKeys("user", {
  profileEdit: () => ({
    queryKey: ["profileEdit"],
  }),
  passwordEdit: () => ({
    queryKey: ["passwordEdit"],
  }),
  deleteAccount: () => ({
    queryKey: ["deleteAccount"],
  }),
});
