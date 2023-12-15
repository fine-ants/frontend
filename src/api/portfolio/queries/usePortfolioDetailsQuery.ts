import { useQuery } from "@tanstack/react-query";
import { getPortfolioDetails } from "..";
import { portfolioKeys } from "./queryKeys";

export default function usePortfolioDetailsQuery(portfolioId: number) {
  return useQuery({
    queryKey: portfolioKeys.details(portfolioId).queryKey,
    queryFn: () => getPortfolioDetails(portfolioId),
    retry: false,
    select: (res) => res.data,
  });
}
