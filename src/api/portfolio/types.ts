import { PieChartData } from "@components/common/PieChart/PieChart";
import { SecuritiesFirm } from "@styles/securitiesFirmLogos";

export type PortfoliosList = {
  portfolios: PortfolioItem[];
};

export type PortfolioItem = {
  id: number;
  securitiesFirm: SecuritiesFirm;
  name: string;
  currentValuation: number;
  budget: number;
  totalGain: number;
  totalGainRate: number;
  dailyGain: number;
  dailyGainRate: number;
  expectedMonthlyDividend: number;
  numShares: number;
  dateCreated: string;
};

// TODO: 정리 필요
export type Portfolio = {
  portfolioDetails: PortfolioDetails;
  portfolioHoldings: PortfolioHolding[];
};

export type PortfolioDetailsSSE = Pick<
  PortfolioDetails,
  | "currentValuation"
  | "totalGain"
  | "totalGainRate"
  | "dailyGain"
  | "dailyGainRate"
  | "provisionalLossBalance"
>;

export type PortfolioHoldingsSSE = Pick<
  PortfolioHolding,
  | "currentValuation"
  | "currentPrice"
  | "dailyChange"
  | "dailyChangeRate"
  | "totalGain"
  | "totalReturnRate"
>;

export type PortfolioSSE = {
  portfolioDetails: PortfolioDetailsSSE;
  portfolioHoldings: PortfolioHoldingsSSE[];
};

export type PortfolioDetails = {
  id: number;
  securitiesFirm: SecuritiesFirm;
  name: string;
  budget: number;
  targetGain: number;
  targetReturnRate: number;
  maximumLoss: number;
  maximumLossRate: number;
  currentValuation: number;
  investedAmount: number;
  totalGain: number;
  totalGainRate: number;
  dailyGain: number;
  dailyGainRate: number;
  balance: number;
  annualDividend: number;
  annualDividendYield: number;
  annualInvestmentDividendYield: number;
  provisionalLossBalance: number;
  targetGainNotification: boolean;
  maxLossNotification: boolean;
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
  dateCreated: string;
};
//TODO : 백엔드에서도 dateCreated 필드 추가해야함

export type PurchaseHistoryField = {
  purchaseHistoryId: number;
  purchaseDate: string;
  numShares: number;
  purchasePricePerShare: number;
  memo: string | null;
};

export type PortfolioReqBody = {
  name: string;
  securitiesFirm: SecuritiesFirm;
  budget: number;
  targetGain: number;
  maximumLoss: number;
};

export type PortfolioHoldingsDividendChartItem = {
  month: number;
  amount: number;
};

export type PortfolioHoldingsSectorBarItem = {
  sector: string;
  sectorWeight: number;
};

export type PortfolioPageCharts = {
  pieChart: PieChartData[];
  dividendChart: PortfolioHoldingsDividendChartItem[];
  sectorChart: PortfolioHoldingsSectorBarItem[];
};
