import { PortfolioDetails } from "@features/portfolio/api/types";

export const portfolioDetails: PortfolioDetails[] = [
  {
    id: 1,
    securitiesFirm: "KB증권",
    name: "물린게아니라장기투자",
    budget: 1000000,
    targetGain: 1500000,
    targetReturnRate: 50,
    maximumLoss: 900000,
    maximumLossRate: 10,
    currentValuation: 600000,
    investedAmount: 500000,
    totalGain: 100000,
    totalGainRate: 10,
    dailyGain: 100000,
    dailyGainRate: 10,
    balance: 500000,
    annualDividend: 15000,
    annualDividendYield: 3,
    annualInvestmentDividendYield: 3,
    provisionalLossBalance: 0,
    targetGainNotify: true,
    maxLossNotify: true,
  },
  {
    id: 2,
    securitiesFirm: "토스증권",
    name: "롱숏롱숏",
    budget: 100,
    targetGain: 150,
    targetReturnRate: 50,
    maximumLoss: 90,
    maximumLossRate: 10,
    currentValuation: 60,
    investedAmount: 50,
    totalGain: 100,
    totalGainRate: 10,
    dailyGain: 100,
    dailyGainRate: 10,
    balance: 500000,
    annualDividend: 15000,
    annualDividendYield: 3,
    annualInvestmentDividendYield: 3,
    provisionalLossBalance: 0,
    targetGainNotify: true,
    maxLossNotify: false,
  },
  {
    id: 3,
    securitiesFirm: "토스증권",
    name: "엘리엇파동12345ABC",
    budget: 1000000,
    targetGain: 1500000,
    targetReturnRate: 50,
    maximumLoss: 900000,
    maximumLossRate: 10,
    currentValuation: 600000,
    investedAmount: 500000,
    totalGain: 100000,
    totalGainRate: 10,
    dailyGain: 100000,
    dailyGainRate: 10,
    balance: 500000,
    annualDividend: 15000,
    annualDividendYield: 3,
    annualInvestmentDividendYield: 3,
    provisionalLossBalance: 0,
    targetGainNotify: true,
    maxLossNotify: false,
  },
  {
    id: 4,
    securitiesFirm: "토스증권",
    name: "하하",
    budget: 1000000,
    targetGain: 0,
    targetReturnRate: 0,
    maximumLoss: 0,
    maximumLossRate: 0,
    currentValuation: 600000,
    investedAmount: 500000,
    totalGain: 100000,
    totalGainRate: 10,
    dailyGain: 100000,
    dailyGainRate: 10,
    balance: 500000,
    annualDividend: 15000,
    annualDividendYield: 3,
    annualInvestmentDividendYield: 3,
    provisionalLossBalance: 0,
    targetGainNotify: false,
    maxLossNotify: false,
  },
];
