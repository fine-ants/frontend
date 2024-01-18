import { fetcher } from "@api/fetcher";
import { Response } from "@api/types";

export type StockSearchItem = {
  stockCode: string;
  tickerSymbol: string;
  companyName: string;
  companyNameEng: string;
  market: string;
};

export const postStockSearch = async (query: string) => {
  const res = await fetcher.post<Response<StockSearchItem[]>>(
    `/stocks/search/`,
    { searchTerm: query }
  );
  return res.data;
};
