import useDashboardPieChartQuery from "@api/dashboard/queries/useDashboardPieChartQuery";
import PortfolioAddDialog from "@components/Portfolio/PortfolioAddDialog";
import Legend from "@components/common/PieChart/Legend";
import { useState } from "react";
import styled from "styled-components";
import PortfolioWeightPieChart from "./PortfolioWeightPieChart";

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

  return (
    <StyledDashboardPortfolioWeight>
      <ChartTitle>포트폴리오 비중</ChartTitle>
      <div style={{ display: "flex", gap: "24px" }}>
        <PortfolioWeightPieChart
          width={320}
          height={320}
          pieData={pieData ?? []}
        />
        <Legend
          pieData={pieData ?? []}
          onPortfolioAddButtonClick={onPortfolioAddDialogOpen}
        />
      </div>

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
