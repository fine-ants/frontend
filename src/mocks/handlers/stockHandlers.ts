import { HTTPSTATUS } from "@api/types";
import {
  InvalidSearchTermStockData,
  successfulStockData,
} from "@mocks/data/stockData";
import { HttpResponse, http } from "msw";

export default [
  http.post<never, { searchTerm: string }>(
    "/api/stocks/search",
    async ({ request }) => {
      // 요청 본문을 파싱합니다.
      const { searchTerm } = await request.json();

      // searchTerm이 제대로 들어왔는지 확인
      if (typeof searchTerm !== "string" || searchTerm.trim() === "") {
        return HttpResponse.json(InvalidSearchTermStockData, {
          status: HTTPSTATUS.badRequest,
        });
      }

      // searchTerm을 기반으로 주식 정보를 필터링합니다.
      const filteredStocks = successfulStockData.data.filter(
        (stock) =>
          stock.tickerSymbol.includes(searchTerm) ||
          stock.companyName.includes(searchTerm)
      );

      // 필터링된 결과를 응답으로 반환합니다.
      return HttpResponse.json(
        {
          ...successfulStockData,
          data: filteredStocks,
        },
        {
          status: HTTPSTATUS.success,
        }
      );
    }
  ),
];
