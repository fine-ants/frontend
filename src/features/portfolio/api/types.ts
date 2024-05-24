import { PieChartData } from "@components/PieChart/PieChart";
import { SecuritiesFirm } from "@constants/securitiesFirm";

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
  targetGainNotify: boolean;
  maxLossNotify: boolean;
};

export type PortfolioHolding = {
  id: number;
  companyName: string;
  tickerSymbol: string;
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
  purchaseHistory: PurchaseHistory[];
  dateAdded: string;
};

export type PurchaseHistory = {
  purchaseHistoryId: number;
  purchaseDate: string;
  numShares: number;
  purchasePricePerShare: number;
  memo: string;
};

export type PurchaseHistoryInput = {
  purchaseDate: string;
  numShares: number;
  purchasePricePerShare: number;
  memo: string;
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
