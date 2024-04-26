import { fetcher } from "@api/fetcher";
import { Response } from "@api/types";

export type StockSearchItem = {
  stockCode: string;
  tickerSymbol: string;
  companyName: string;
  companyNameEng: string;
  market: string;
};

export type StockItem = {
  stockCode: string;
  tickerSymbol: string;
  companyName: string;
  companyNameEng: string;
  market: string;
  currentPrice: number;
  dailyChange: number;
  dailyChangeRate: number;
  sector: string;
  annualDividend: number;
  annualDividendYield: number;
  dividendMonths: number[];
};

export const postStockSearch = async (query: string) => {
  const res = await fetcher.post<Response<StockSearchItem[]>>(
    `/stocks/search`,
    { searchTerm: query }
  );
  return res.data;
};

export const getStockPage = async (tickerSymbol: string) => {
  const res = await fetcher.get<Response<StockItem>>(`/stocks/${tickerSymbol}`);
  return res.data;
};
