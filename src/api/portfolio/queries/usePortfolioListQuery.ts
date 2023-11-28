import { useQuery } from "@tanstack/react-query";
import { getPortfoliosList } from "..";
import { portfolioKeys } from "./queryKeys";

export default function usePortfolioListQuery() {
  return useQuery({
    queryKey: portfolioKeys.list().queryKey,
    queryFn: getPortfoliosList,
    retry: false,
    select: (res) => res.data,
    meta: {
      errorMessage: "포트폴리오 차트를 불러오는데 실패했습니다",
    },
  });
}
