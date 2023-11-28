import useDashboardPieChartQuery from "@api/dashboard/queries/useDashboardPieChartQuery";
import PortfolioAddDialog from "@components/Portfolio/PortfolioAddDialog";
import PieChartLegend from "@components/common/PieChart/PieChartLegend";
import { Suspense, useState } from "react";
import styled from "styled-components";
import EmptyPortfolioMessage from "./PortfolioWeightPieChart/EmptyPortfolioMessage";
import PortfolioWeightPieChart from "./PortfolioWeightPieChart/PortfolioWeightPieChart";

export default function DashboardPortfolioWeight() {
  const { data: pieData } = useDashboardPieChartQuery();

  const [isPortfolioAddDialogOpen, setIsPortfolioAddDialogOpen] =
    useState(false);

  const onPortfolioAddDialogOpen = () => {
    setIsPortfolioAddDialogOpen(true);
  };

  const onPortfolioAddDialogClose = () => {
    setIsPortfolioAddDialogOpen(false);
  };

  const pieChartLegendList = pieData?.map((item) => ({
    title: item.name,
    percent: item.weight,
    color: item.fill,
  }));

  return (
    <StyledDashboardPortfolioWeight>
      <ChartTitle>포트폴리오 비중</ChartTitle>
      {/* TODO: Suspense fallback component */}
      <Suspense fallback={<div>로딩중</div>}>
        <div style={{ display: "flex", gap: "24px" }}>
          <PortfolioWeightPieChart
            width={320}
            height={320}
            pieData={pieData ?? []}
          />
          {pieData && pieData.length > 0 ? (
            <PieChartLegend
              legendList={pieChartLegendList ?? []}
              etcOptions={{ title: "기타", numItemsFromFront: 10 }}
            />
          ) : (
            <EmptyPortfolioMessage
              onPortfolioAddButtonClick={onPortfolioAddDialogOpen}
            />
          )}
        </div>
      </Suspense>

      {isPortfolioAddDialogOpen && (
        <PortfolioAddDialog
          isOpen={isPortfolioAddDialogOpen}
          onClose={onPortfolioAddDialogClose}
        />
      )}
    </StyledDashboardPortfolioWeight>
  );
}

const StyledDashboardPortfolioWeight = styled.div`
  width: 708px;
  height: 480px;
  background-color: #ffffff;
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  padding: 32px;
  gap: 24px;
`;

const ChartTitle = styled.div`
  font-size: 24px;
  line-height: 29px;
  font-weight: bold;
`;
