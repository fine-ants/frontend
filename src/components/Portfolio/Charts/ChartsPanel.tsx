import usePortfolioHoldingChartsQuery from "@api/portfolio/queries/usePortfolioHoldingChartsQuery";
import { chartColorPalette } from "@styles/chartColorPalette";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import DividendBarChartContainer from "./Dividend/DividendBarChartContainer";
import { PieChartContainer } from "./Pie/PieChartContainer";
import SectorBarChartContainer from "./Sector/SectorBarChartContainer";

export default function ChartsPanel() {
  const { portfolioId } = useParams();

  const { data: portfolioHoldingCharts } = usePortfolioHoldingChartsQuery(
    Number(portfolioId)
  );

  const { pieChart, dividendChart, sectorChart } = portfolioHoldingCharts;

  const coloredPieChart = pieChart?.map((item, index) => ({
    ...item,
    fill: chartColorPalette[index],
  }));

  const pieChartLegendList = coloredPieChart?.map((item) => ({
    title: item.name,
    percent: item.weight,
    color: item.fill,
  }));

  const sectorLegendList = sectorChart?.map((item, index) => ({
    title: item.sector,
    percent: item.sectorWeight,
    color: chartColorPalette[index],
  }));

  return (
    <StyledChartsPanel>
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
  );
}

const StyledChartsPanel = styled.div`
  background-color: ${({ theme: { color } }) => color.neutral.white};
  display: flex;
  flex-direction: column;
  gap: 48px;
  width: 464px;
  padding: 32px;
`;
