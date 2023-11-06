import { fetcher } from "@api/fetcher";
import { Response } from "@api/types";

export type PortfolioList = {
  portfolios: PortfolioItem[];
  hasNext: boolean;
  nextCursor: string | null;
};

export type PortfolioItem = {
  id: number;
  securitiesFirm: string;
  name: string;
  budget: number;
  totalGain: number;
  totalGainRate: number;
  dailyGain: number;
  dailyGainRate: number;
  expectedMonthlyDividend: number;
  totalNumShares: number;
};

export type Portfolio = {
  portfolioDetails: PortfolioDetails;
  portfolioHoldings: PortfolioHolding[];
};

export type PortfolioDetails = {
  id: number;
  securitiesFirm: string;
  name: string;
  budget: number;
  targetGain: number;
  targetReturnRate: number;
  maximumLoss: number;
  maximumLossRate: number;
  investedAmount: number;
  totalGain: number;
  totalGainRate: number;
  dailyGain: number;
  dailyGainRate: number;
  balance: number;
  totalAnnualDividend: number;
  totalAnnualDividendYield: number;
  annualInvestmentDividendYield: number;
  provisionalLossBalance: number;
};

export type PortfolioHolding = {
  companyName: string;
  tickerSymbol: string;
  portfolioHoldingId: number;
  currentValuation: number;
  currentPrice: number;
  averageCostPerShare: number;
  numShares: number;
  dailyChange: number;
  dailyChangeRate: number;
  totalGain: number;
  totalReturnRate: number;
  annualDividend: number;
  annualDividendYield: number;
  purchaseHistory: PurchaseHistoryField[];
};

export type PurchaseHistoryField = {
  purchaseHistoryId: number;
  purchaseDate: string;
  numShares: number;
  purchasePricePerShare: number;
  memo: string | null;
};

type PortfolioReqBody = {
  name: string;
  securitiesFirm: string;
  budget: number;
  targetGain: number;
  maximumLoss: number;
};

export const getPortfolioList = async () => {
  const res = await fetcher.get<Response<PortfolioList>>("/portfolios");
  return res.data;
};

export const getPortfolioDetails = async (portfolioId: number) => {
  const res = await fetcher.get<Response<Portfolio>>(
    `/portfolio/${portfolioId}/holdings`
  );
  return res.data;
};

export const postPortfolio = async (body: PortfolioReqBody) => {
  const res = await fetcher.post<Response<{ portfolioId: number }>>(
    `/portfolios`,
    body
  );
  return res.data;
};

export const putPortfolio = async ({
  portfolioId,
  body,
}: {
  portfolioId: number;
  body: PortfolioReqBody;
}) => {
  const res = await fetcher.put<Response<Portfolio>>(
    `/portfolios/${portfolioId}`,
    body
  );
  return res.data;
};

export const deletePortfolio = async (portfolioId: number) => {
  const res = await fetcher.delete<Response<Portfolio>>(
    `/portfolios/${portfolioId}`
  );
  return res.data;
};

export const postPortfolioHolding = async ({
  portfolioId,
  body,
}: {
  portfolioId: number;
  body: {
    tickerSymbol: string;
  };
}) => {
  const res = await fetcher.post<Response<null>>(
    `/portfolio/${portfolioId}/holdings`,
    body
  );
  return res.data;
};

export const deletePortfolioHolding = async ({
  portfolioId,
  portfolioHoldingId,
}: {
  portfolioId: number;
  portfolioHoldingId: number;
}) => {
  const res = await fetcher.delete<Response<null>>(
    `/portfolio/${portfolioId}/holdings/${portfolioHoldingId}`
  );
  return res.data;
};

export const postPortfolioHoldingPurchase = async ({
  portfolioId,
  portfolioHoldingId,
  body,
}: {
  portfolioId: number;
  portfolioHoldingId: number;
  body: {
    purchaseDate: string;
    numShares: number;
    purchasePricePerShare: number;
    memo: string;
  };
}) => {
  const res = await fetcher.post<Response<null>>(
    `/portfolio/${portfolioId}/holdings/${portfolioHoldingId}/purchaseHistory`,
    body
  );
  return res.data;
};

export const putPortfolioHoldingPurchase = async ({
  portfolioId,
  portfolioHoldingId,
  purchaseHistoryId,
  body,
}: {
  portfolioId: number;
  portfolioHoldingId: number;
  purchaseHistoryId: number;
  body: {
    purchaseDate: string;
    numShares: number;
    purchasePricePerShare: number;
    memo: string;
  };
}) => {
  const res = await fetcher.put<Response<null>>(
    `/portfolio/${portfolioId}/holdings/${portfolioHoldingId}/purchaseHistory/${purchaseHistoryId}`,
    body
  );
  return res.data;
};

export const deletePortfolioHoldingPurchase = async ({
  portfolioId,
  portfolioHoldingId,
  purchaseHistoryId,
}: {
  portfolioId: number;
  portfolioHoldingId: number;
  purchaseHistoryId: number;
}) => {
  const res = await fetcher.delete<Response<null>>(
    `/portfolio/${portfolioId}/holdings/${portfolioHoldingId}/purchaseHistory/${purchaseHistoryId}`
  );
  return res.data;
};
