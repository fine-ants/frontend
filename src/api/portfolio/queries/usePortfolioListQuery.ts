import { Response } from "@api/types";
import { UserContext } from "@context/UserContext";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { getPortfoliosList } from "..";
import { PortfoliosList } from "../types";
import { portfolioKeys } from "./queryKeys";

export default function usePortfolioListQuery() {
  // TOOD: 임시 처방
  // 로그인하지 않았을 때도 Header 컴포넌트에서 포트폴리오 목록을 불러오기 때문 (401 error 발생).
  const { user } = useContext(UserContext);

  return useSuspenseQuery({
    queryKey: portfolioKeys.list().queryKey,
    queryFn: () => {
      return new Promise<Response<PortfoliosList>>((resolve) => {
        if (!user)
          return resolve({
            code: 200,
            status: "",
            message: "",
            data: { portfolios: [] },
          });
        resolve(getPortfoliosList());
      });
    },
    retry: false,
    select: (res) => res.data,
    meta: {
      errorMessage: "포트폴리오 목록을 불러오는데 실패했습니다",
    },
  });
}
