import usePortfolioHoldingChartsQuery from "@api/portfolio/queries/usePortfolioHoldingChartsQuery";
import { chartColorPalette } from "@styles/chartColorPalette";
import styled from "styled-components";
import DividendBarChartContainer from "./Dividend/DividendBarChartContainer";
import { PieChartContainer } from "./Pie/PieChartContainer";
import SectorBarChartContainer from "./Sector/SectorBarChartContainer";

type Props = { portfolioId: number };

export default function ChartsPanel({ portfolioId }: Props) {
  const { data: portfolioHoldingCharts } =
    usePortfolioHoldingChartsQuery(portfolioId);

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
  height: 1061px;
  padding: 32px;
`;
