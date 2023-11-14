import { fetcher } from "@api/fetcher";
import { Response } from "@api/types";

export type WatchlistItemType = {
  id: number;
  companyName: string;
  tickerSymbol: number;
  currentPrice: number;
  dailyChangeRate: number;
  annualDividendYield: number;
  sector: string;
};

export const getWatchlist = async () => {
  const res = await fetcher.get<Response<WatchlistItemType[]>>("/watchlist");
  return res.data;
};

export const postWatchlist = async ({
  body,
}: {
  body: {
    tickerSymbol: string;
  };
}) => {
  const res = await fetcher.post<Response<null>>("/watchlist", body);
  return res.data;
};

export const deleteWatchlistItem = async (tickerSymbol: string) => {
  const res = await fetcher.delete<Response<null>>(
    `/watchlist/${tickerSymbol}`
  );
  return res.data;
};
