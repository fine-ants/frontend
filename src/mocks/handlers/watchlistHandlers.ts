import { HTTPSTATUS } from "@api/types";
import {
  successfulDeleteWatchlistStocksResponse,
  successfulDeleteWatchlistsResponse,
  successfulGetWatchlistResponse,
  successfulGetWatchlistsResponse,
  successfulPostWatchlistResponse,
  successfulPostWatchlistStocksResponse,
  watchlistData,
  watchlistsData,
} from "@mocks/data/watchlistData";
import { HttpResponse, http } from "msw";
export default [
  // Watchlist 목록 조회
  http.get("/api/watchlists", () => {
    return HttpResponse.json(successfulGetWatchlistsResponse, {
      status: HTTPSTATUS.success,
    });
  }),

  // Watchlist 추가
  http.post<never, { name: string }>("/api/watchlists", async ({ request }) => {
    const { name } = await request.json();
    const newWatchlistId = watchlistsData.length + 1;
    const data = {
      id: newWatchlistId,
      name: name,
    };
    watchlistsData.push(data);

    return HttpResponse.json(successfulPostWatchlistResponse(newWatchlistId), {
      status: HTTPSTATUS.success,
    });
  }),

  // Watchlist 다수 삭제
  http.delete<never, { watchlistIds: number[] }>(
    "/api/watchlists",
    async ({ request }) => {
      const { watchlistIds } = await request.json();
      watchlistIds.forEach((id: number) => {
        const index = watchlistsData.findIndex((item) => item.id === id);
        if (index > -1) {
          watchlistsData.splice(index, 1);
        }
      });

      return HttpResponse.json(successfulDeleteWatchlistsResponse, {
        status: HTTPSTATUS.success,
      });
    }
  ),

  // Watchlist 조회
  http.get("/api/watchlists/:watchlistId", () => {
    return HttpResponse.json(successfulGetWatchlistResponse, {
      status: HTTPSTATUS.success,
    });
  }),

  // Watchlist 종목 다수 추가
  http.post<never, { tickerSymbols: string[] }>(
    "/api/watchlists/:watchlistId/stock",
    async ({ request }) => {
      const { tickerSymbols } = await request.json();
      const newItems = tickerSymbols.map(
        (tickerSymbol: string, index: number) => {
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
        }
      );
      watchlistData.push(...newItems);

      return HttpResponse.json(successfulPostWatchlistStocksResponse, {
        status: HTTPSTATUS.success,
      });
    }
  ),

  // Watchlist 종목 다수 삭제
  http.delete<never, { tickerSymbols: string[] }>(
    "/api/watchlists/:watchlistId/stock",
    async ({ request }) => {
      const { tickerSymbols } = await request.json();
      tickerSymbols.forEach((tickerSymbol: string) => {
        const index = watchlistData.findIndex(
          (item) => item.tickerSymbol === tickerSymbol
        );
        if (index > -1) {
          watchlistData.splice(index, 1);
        }
      });

      return HttpResponse.json(successfulDeleteWatchlistStocksResponse, {
        status: HTTPSTATUS.success,
      });
    }
  ),
];
