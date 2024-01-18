import { HTTPSTATUS } from "@api/types";
import {
  successfulGetOverviewDataResponse,
  successfulGetPortfolioPieChartDataResponse,
  successfulGetTotalValuationDataResponse,
} from "@mocks/data/dashboardData";
import { HttpResponse, http } from "msw";

export default [
  // Get dashboard overview data
  http.get("/api/dashboard/overview", () => {
    return HttpResponse.json(successfulGetOverviewDataResponse, {
      status: HTTPSTATUS.success,
    });
  }),

  // Get portfolio pie chart data
  http.get("/api/dashboard/pieChart", () => {
    return HttpResponse.json(successfulGetPortfolioPieChartDataResponse, {
      status: HTTPSTATUS.success,
    });
  }),

  // Get total valuation line chart data
  http.get("/api/dashboard/lineChart", () => {
    return HttpResponse.json(successfulGetTotalValuationDataResponse, {
      status: HTTPSTATUS.success,
    });
  }),
];
