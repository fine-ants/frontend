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

export const getWatchlist = async () => {
  const res = await fetcher.get<Response<WatchlistItemType[]>>("/watchlists");
  return res.data;
};

export const postWatchlistItem = async (tickerSymbol: string) => {
  const res = await fetcher.post<Response<null>>("/watchlists", {
    tickerSymbol,
  });
  return res.data;
};

export const deleteWatchlistItem = async (tickerSymbol: string) => {
  const res = await fetcher.delete<Response<null>>(
    `/watchlists/${tickerSymbol}`
  );
  return res.data;
};
