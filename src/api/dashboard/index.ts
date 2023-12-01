import { fetcher } from "@api/fetcher";
import { Response } from "@api/types";
import { PieChartData } from "@components/common/PieChart/PieChart";
import { LineData } from "lightweight-charts";
import { OverviewData } from "./types";

export const getDashboardOverview = async () => {
  const res = await fetcher.get<Response<OverviewData>>("/dashboard/overview");
  return res.data;
};

export const getPortfoliosWeightPieChart = async () => {
  const res = await fetcher.get<Response<PieChartData[]>>(
    "/dashboard/pieChart"
  );
  return res.data;
};

export const getTotalValuationLineChart = async () => {
  const res = await fetcher.get<Response<LineData[]>>("/dashboard/lineChart");
  return res.data;
};
