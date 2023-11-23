import { fetcher } from "@api/fetcher";
import { Response } from "@api/types";
import { LineData } from "lightweight-charts";

export type OverviewData = {
  userName: string;
  totalValuation: number;
  totalInvestment: number;
  totalGain: number;
  totalGainRate: number;
  totalAnnualDividend: number;
  totalAnnualDividendYield: number;
};

export type PortfolioPieChartData = {
  id: number;
  name: string;
  valuation: number;
  fill: string;
  totalGain: number;
  totalGainRate: number;
  weight: number;
};

export type TotalValuationLineChartData = {
  date: string;
  valuation: number;
};

export const getDashboardOverview = async () => {
  const res = await fetcher.get<Response<OverviewData>>("/dashboard/overview");
  return res.data;
};

export const getPortfolioPieChart = async () => {
  const res = await fetcher.get<Response<PortfolioPieChartData[]>>(
    "/dashboard/pieChart"
  );
  return res.data;
};

export const getTotalValuationLineChart = async () => {
  const res = await fetcher.get<Response<LineData[]>>("/dashboard/lineChart");
  return res.data;
};
