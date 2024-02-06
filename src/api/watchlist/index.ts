import { fetcher } from "@api/fetcher";
import { Response } from "@api/types";

export type WatchlistItemType = {
  id: number;
  companyName: string;
  tickerSymbol: string;
  currentPrice: number;
  dailyChange: number;
  dailyChangeRate: number;
  annualDividendYield: number;
  sector: string;
  dateAdded: string;
};

export type WatchlistData = {
  name: string;
  watchStocks: WatchlistItemType[];
};

export type WatchlistsType = {
  id: number;
  name: string;
};

export type WatchlistHasStockData = {
  id: number;
  name: string;
  hasStock: boolean;
};

//watchlist 목록 api

export const getWatchlists = async () => {
  const res = await fetcher.get<Response<WatchlistsType[]>>("/watchlists");
  return res.data;
};

export const postWatchlists = async (newWatchlistName: string) => {
  const res = await fetcher.post<Response<null>>("/watchlists", {
    name: newWatchlistName,
  });
  return res.data;
};

export const deleteWatchlists = async (watchlistIds: readonly number[]) => {
  const res = await fetcher.delete<Response<null>>("/watchlists", {
    data: { watchlistIds },
  });
  return res.data;
};

//watchlist 단일 & 종목 api

export const getWatchlist = async (watchlistId: number) => {
  const res = await fetcher.get<Response<WatchlistData>>(
    `/watchlists/${watchlistId}`
  );
  return res.data;
};

export const postWatchlistStock = async ({
  watchlistId,
  tickerSymbols,
}: {
  watchlistId: number;
  tickerSymbols: string[];
}) => {
  const res = await fetcher.post<Response<null>>(
    `/watchlists/${watchlistId}/stock`,
    { tickerSymbols }
  );
  return res.data;
};

export const deleteWatchlistStock = async ({
  watchlistId,
  tickerSymbols,
}: {
  watchlistId: number;
  tickerSymbols: string[];
}) => {
  const res = await fetcher.delete<Response<null>>(
    `/watchlists/${watchlistId}/stock`,
    {
      data: { tickerSymbols },
    }
  );
  return res.data;
};

export const getWatchlistHasStock = async (tickerSymbol: string) => {
  const res = await fetcher.get<Response<WatchlistHasStockData[]>>(
    `/watchlists/stockExists/${tickerSymbol}`
  );
  return res.data;
};
