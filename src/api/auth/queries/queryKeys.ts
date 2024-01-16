import { createQueryKeys } from "@lukemorales/query-key-factory";

export const authKeys = createQueryKeys("user", {
  signIn: () => ({
    queryKey: ["signIn"],
  }),
  signUp: () => ({
    queryKey: ["signUp"],
  }),
  edit: () => ({
    queryKey: ["edit"],
  }),
});
