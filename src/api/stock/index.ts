import { fetcher } from "@api/fetcher";
import { Response } from "@api/types";

export type StockSearchResponse = {
  stockCode: string;
  tickerSymbol: string;
  companyName: string;
  companyNameEng: string;
  market: string;
};

export const postStockSearch = async (query: string) => {
  const res = await fetcher.post<Response<StockSearchResponse[]>>(
    `/stocks/search/`,
    { searchTerm: query }
  );
  return res.data;
};
