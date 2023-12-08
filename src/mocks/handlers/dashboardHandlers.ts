import { HTTPSTATUS } from "@api/types";
import {
  successfulGetOverviewDataResponse,
  successfulGetPortfolioPieChartDataResponse,
  successfulGetTotalValuationDataResponse,
} from "@mocks/data/dashboardData";
import { rest } from "msw";

export default [
  // Get dashboard overview data
  rest.get("/api/dashboard/overview", async (_, res, ctx) => {
    return res(
      ctx.status(HTTPSTATUS.success),
      ctx.json(successfulGetOverviewDataResponse)
    );
  }),
  // Get portfolio pie chart data
  rest.get("/api/dashboard/pieChart", async (_, res, ctx) => {
    return res(
      ctx.status(HTTPSTATUS.success),
      ctx.json(successfulGetPortfolioPieChartDataResponse)
    );
  }),

  // Get total valuation line chart data
  rest.get("/api/dashboard/lineChart", async (_, res, ctx) => {
    return res(
      ctx.status(HTTPSTATUS.success),
      ctx.json(successfulGetTotalValuationDataResponse)
    );
  }),
];
