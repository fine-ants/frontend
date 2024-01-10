import { HTTPSTATUS } from "@api/types";
import {
  successfulGetWatchlistResponse,
  successfulGetWatchlistsResponse,
  watchlistData,
  watchlistsData,
} from "@mocks/data/watchlistData";
import { rest } from "msw";

export default [
  //watchlist 목록 api
  rest.get("/api/watchlists", (_, res, ctx) => {
    return res(
      ctx.status(HTTPSTATUS.success),
      ctx.json(successfulGetWatchlistsResponse)
    );
  }),

  rest.post("/api/watchlists", async (req, res, ctx) => {
    const { name } = await req.json();

    const newWatchlistId = watchlistsData.length + 1;

    const data = {
      id: newWatchlistId,
      name: name,
    };

    watchlistsData.push(data);

    return res(
      ctx.status(HTTPSTATUS.success),
      ctx.json({ ...successfulGetWatchlistsResponse, data: data })
    );
  }),

  rest.delete("/api/watchlists", async (req, res, ctx) => {
    try {
      const { watchlistIds } = await req.json();

      watchlistIds.forEach((id: number) => {
        const index = watchlistsData.findIndex((item) => item.id === id);
        if (index > -1) {
          watchlistsData.splice(index, 1);
        }
      });

      return res(
        ctx.status(HTTPSTATUS.success),
        ctx.json({ ...successfulGetWatchlistsResponse, data: null })
      );
    } catch (error) {
      return res(ctx.status(500), ctx.json({ error: "Internal Server Error" }));
    }
  }),

  //watchlist 단일 api
  rest.get("/api/watchlists/:watchlistId", (_, res, ctx) => {
    return res(
      ctx.status(HTTPSTATUS.success),
      ctx.json(successfulGetWatchlistResponse)
    );
  }),

  rest.post("/api/watchlists/:watchlistId/stock", async (req, res, ctx) => {
    const { tickerSymbols } = await req.json();

    const data = tickerSymbols.map((tickerSymbol: string, index: number) => {
      return {
        id: watchlistData.length + 1 + index,
        companyName: "새로추가주식",
        tickerSymbol: tickerSymbol,
        currentPrice: 60000,
        dailyChange: 7000,
        dailyChangeRate: 13.35,
        annualDividendYield: 3.5,
        sector: "제조업",
        dateAdded: "2023-12-30T15:00:00",
      };
    });

    watchlistData.push(...data);

    return res(
      ctx.status(HTTPSTATUS.success),
      ctx.json({ ...successfulGetWatchlistResponse, data: data })
    );
  }),

  rest.delete("/api/watchlists/:watchlistId/stock", async (req, res, ctx) => {
    const { tickerSymbols } = await req.json();

    tickerSymbols.forEach((tickerSymbol: string) => {
      const index = watchlistData.findIndex(
        (item) => item.tickerSymbol === tickerSymbol
      );
      if (index > -1) {
        watchlistData.splice(index, 1);
      }
    });

    return res(
      ctx.status(HTTPSTATUS.success),
      ctx.json({ ...successfulGetWatchlistResponse, data: null })
    );
  }),
];
