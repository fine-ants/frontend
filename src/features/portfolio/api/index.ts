import { fetcher } from "@api/fetcher";
import { Response } from "@api/types";
import {
  Portfolio,
  PortfolioPageCharts,
  PortfolioReqBody,
  PortfoliosList,
  PurchaseHistoryInput,
} from "./types";

export const getPortfoliosList = async () => {
  const res = await fetcher.get<Response<PortfoliosList>>("/portfolios");
  return res.data;
};

export const getPortfolioCharts = async (portfolioId: number) => {
  const res = await fetcher.get<Response<PortfolioPageCharts>>(
    `/portfolio/${portfolioId}/charts`
  );
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
  const res = await fetcher.delete<Response<null>>(
    `/portfolios/${portfolioId}`
  );
  return res.data;
};

export const deletePortfolios = async (portfolioIds: number[]) => {
  const res = await fetcher.delete<Response<null>>("/portfolios", {
    data: { portfolioIds },
  });
  return res.data;
};

export const postPortfolioHolding = async ({
  portfolioId,
  body,
}: {
  portfolioId: number;
  body: {
    tickerSymbol: string;
    purchaseHistory?: PurchaseHistoryInput;
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

export const deletePortfolioHoldings = async ({
  portfolioId,
  body,
}: {
  portfolioId: number;
  body: {
    portfolioHoldingIds: readonly number[];
  };
}) => {
  const res = await fetcher.delete<Response<null>>(
    `/portfolio/${portfolioId}/holdings`,
    { data: body }
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
