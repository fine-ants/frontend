import usePortfolioHoldingChartsQuery from "@features/portfolio/api/queries/usePortfolioHoldingChartsQuery";
import useResponsiveLayout from "@hooks/useResponsiveLayout";
import { chartColorPalette } from "@styles/chartColorPalette";
import designSystem from "@styles/designSystem";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import DividendBarChartContainer from "../Charts/Dividend/DividendBarChartContainer";
import { PieChartContainer } from "../Charts/PieChart/PieChartContainer";
import SectorBarChartContainer from "../Charts/Sector/SectorBarChartContainer";
import PortfolioHeaderM from "../PortfolioHeaderM";
import { PortfolioPageTab } from "../types";

type Props = {
  tab: PortfolioPageTab;
  onChangeTab: (tab: PortfolioPageTab) => void;
};

export default function ChartsPanel({ tab, onChangeTab }: Props) {
  const { portfolioId } = useParams();

  const { isMobile } = useResponsiveLayout();

  const { data: portfolioHoldingCharts } = usePortfolioHoldingChartsQuery(
    Number(portfolioId)
  );

  const { name, securitiesFirm } = portfolioHoldingCharts.portfolioDetails;

  const { pieChart, dividendChart, sectorChart } = portfolioHoldingCharts;

  const coloredPieChart = pieChart.map((item, index) => ({
    ...item,
    fill: chartColorPalette[index],
  }));

  const pieChartLegendList = coloredPieChart.map((item) => ({
    title: item.name,
    percent: item.weight,
    color: item.fill,
  }));

  const sectorLegendList = sectorChart.map((item, index) => ({
    title: item.sector,
    percent: item.sectorWeight,
    color: chartColorPalette[index],
  }));

  return (
    <>
      {isMobile && (
        <PortfolioHeaderM
          name={name}
          securitiesFirm={securitiesFirm}
          tab={tab}
          onChangeTab={onChangeTab}
        />
      )}

      <StyledChartsPanel $isMobile={isMobile}>
        <PieChartContainer
          coloredPieChart={coloredPieChart}
          pieChartLegendList={pieChartLegendList}
        />

        <DividendBarChartContainer dividendChart={dividendChart} />

        <SectorBarChartContainer
          sectorChart={sectorChart}
          sectorLegendList={sectorLegendList}
        />
      </StyledChartsPanel>
    </>
  );
}

const StyledChartsPanel = styled.div<{ $isMobile: boolean }>`
  width: ${({ $isMobile }) => ($isMobile ? "100%" : "464px")};
  display: flex;
  flex-direction: column;
  gap: 48px;
  padding: ${({ $isMobile }) => ($isMobile ? "32px 16px" : "32px")};
  border-radius: 8px;
  background-color: ${designSystem.color.neutral.white};
`;
