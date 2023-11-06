import { successfulStockData } from "mocks/data/stockData";
import { rest } from "msw";

export default [
  rest.post("/api/stocks/search", (req, res, ctx) => {
    // 요청 본문을 파싱합니다.
    const { searchTerm } = req.body as { searchTerm: string };

    // searchTerm이 제대로 들어왔는지 확인
    if (typeof searchTerm !== "string" || searchTerm.trim() === "") {
      return res(ctx.status(400), ctx.json({ error: "Invalid searchTerm" }));
    }

    // searchTerm을 기반으로 주식 정보를 필터링합니다.
    const filteredStocks = successfulStockData.data.filter(
      (stock) =>
        stock.tickerSymbol.includes(searchTerm) ||
        stock.companyName.includes(searchTerm)
    );

    // 필터링된 결과를 응답으로 반환합니다.
    return res(
      ctx.status(200),
      ctx.json({
        ...successfulStockData,
        data: filteredStocks,
      })
    );
  }),
];
