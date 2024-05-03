import TallLegend from "@components/Legend/TallLegend";
import PieChart from "@components/PieChart/PieChart";
import useDashboardPieChartQuery from "@features/dashboard/api/queries/useDashboardPieChartQuery";
import PortfolioAddDialog from "@features/portfolio/components/PortfolioAddOrEditDialog";
import { useBoolean } from "@hooks/useBoolean";
import { chartColorPalette } from "@styles/chartColorPalette";
import designSystem from "@styles/designSystem";
import { Suspense } from "react";
import styled from "styled-components";
import EmptyPortfolioMessage from "./PortfolioWeightPieChart/EmptyPortfolioMessage";

export default function DashboardPortfolioWeight() {
  const { data: pieChart } = useDashboardPieChartQuery();

  const {
    state: isPortfolioAddDialogOpen,
    setTrue: onPortfolioAddDialogOpen,
    setFalse: onPortfolioAddDialogClose,
  } = useBoolean();

  const coloredPieChart = pieChart.map((item, index) => ({
    ...item,
    fill: chartColorPalette[index],
  }));

  const pieChartLegendList = coloredPieChart.map((item) => ({
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
          <PieChart
            width={320}
            height={320}
            hoverGap={16}
            pieData={coloredPieChart ?? []}
          />
          {coloredPieChart && coloredPieChart.length > 0 ? (
            <TallLegend
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
  width: 50%;
  height: 480px;
  padding: 32px;
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 10px;
  gap: 24px;
`;

const ChartTitle = styled.div`
  font: ${designSystem.font.heading3.font};
  letter-spacing: ${designSystem.font.heading3.letterSpacing};
`;
