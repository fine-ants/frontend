import { HTTPSTATUS } from "@api/types";
import {
  successfulGetWatchlistResponse,
  watchlistData,
} from "@mocks/data/watchlistData";
import { rest } from "msw";

export default [
  rest.get("/api/watchlist", (_, res, ctx) => {
    return res(
      ctx.status(HTTPSTATUS.success),
      ctx.json(successfulGetWatchlistResponse)
    );
  }),

  rest.post("/api/watchlist", async (req, res, ctx) => {
    const { tickerSymbol } = await req.json();

    const newWatchlistId = watchlistData.length + 1;

    const data = {
      id: newWatchlistId,
      companyName: "새로추가주식",
      tickerSymbol: tickerSymbol,
      currentPrice: 60000,
      dailyChangeRate: 13.35,
      annualDividendYield: 3.5,
      sector: "제조업",
    };

    watchlistData.push(data);

    return res(
      ctx.status(HTTPSTATUS.success),
      ctx.json({ ...successfulGetWatchlistResponse, data: data })
    );
  }),

  rest.delete("/api/watchlist/:tickerSymbol", async (req, res, ctx) => {
    let tickerSymbol = req.params.tickerSymbol as string;

    if (Array.isArray(tickerSymbol)) {
      tickerSymbol = tickerSymbol[0];
    }

    const index = watchlistData.findIndex(
      (item) => item.tickerSymbol === tickerSymbol
    );

    watchlistData.splice(index, 1);

    return res(
      ctx.status(HTTPSTATUS.success),
      ctx.json({ ...successfulGetWatchlistResponse, data: null })
    );
  }),
];
