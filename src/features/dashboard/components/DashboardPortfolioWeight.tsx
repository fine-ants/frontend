import emptyHoldingsPieChartImg from "@assets/images/no_holdings_pie_chart.png";
import TallLegend from "@components/Legend/TallLegend";
import PieChart from "@components/PieChart/PieChart";
import useDashboardPieChartQuery from "@features/dashboard/api/queries/useDashboardPieChartQuery";
import PortfolioAddDialog from "@features/portfolio/components/PortfolioAddOrEditDialog/PortfolioAddOrEditDialog";
import { useBoolean } from "@fineants/demolition";
import useResponsiveLayout from "@hooks/useResponsiveLayout";
import { chartColorPalette } from "@styles/chartColorPalette";
import designSystem from "@styles/designSystem";
import { Suspense } from "react";
import styled from "styled-components";
import EmptyPortfolioMessage from "./PortfolioWeightPieChart/EmptyPortfolioMessage";

export default function DashboardPortfolioWeight() {
  const { isMobile } = useResponsiveLayout();
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

  const allWeightsAreZero = coloredPieChart.every((obj) => obj.weight === 0);

  return (
    <StyledDashboardPortfolioWeight $isMobile={isMobile}>
      <ChartTitle $isMobile={isMobile}>포트폴리오 비중</ChartTitle>
      {/* TODO: Suspense fallback component */}
      <Suspense fallback={<div>로딩중</div>}>
        <ChartWrapper $isMobile={isMobile}>
          {coloredPieChart.length === 0 ? (
            <img
              width={isMobile ? 280 : 320}
              src={emptyHoldingsPieChartImg}
              alt="비어있는 파이차트 이미지"
            />
          ) : (
            <PieChart
              width={isMobile ? 280 : 320}
              height={isMobile ? 280 : 320}
              hoverGap={16}
              pieData={allWeightsAreZero ? [] : coloredPieChart}
            />
          )}

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
        </ChartWrapper>
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

const StyledDashboardPortfolioWeight = styled.div<{ $isMobile: boolean }>`
  width: ${({ $isMobile }) => ($isMobile ? "100%" : "50%")};
  height: ${({ $isMobile }) => ($isMobile ? "auto" : "480px")};
  padding: ${({ $isMobile }) => ($isMobile ? "32px 16px" : "32px")};
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 10px;
  gap: 24px;
`;

const ChartWrapper = styled.div<{ $isMobile: boolean }>`
  display: flex;
  align-items: center;
  flex-direction: ${({ $isMobile }) => ($isMobile ? "column" : "row")};
  gap: ${({ $isMobile }) => ($isMobile ? "16px" : "24px")};
`;

const ChartTitle = styled.div<{ $isMobile: boolean }>`
  font: ${({ $isMobile }) =>
    $isMobile
      ? designSystem.font.heading4.font
      : designSystem.font.heading3.font};
  letter-spacing: ${({ $isMobile }) =>
    $isMobile
      ? designSystem.font.heading4.letterSpacing
      : designSystem.font.heading3.letterSpacing};
`;
