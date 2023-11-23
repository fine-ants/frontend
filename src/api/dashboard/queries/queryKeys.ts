import { createQueryKeys } from "@lukemorales/query-key-factory";

export const dashboardKeys = createQueryKeys("dashboard", {
  overview: () => ({
    queryKey: ["overview"],
  }),
  pieChart: () => ({
    queryKey: ["pieChart"],
  }),
  lineChart: () => ({
    queryKey: ["lineChart"],
  }),
});
