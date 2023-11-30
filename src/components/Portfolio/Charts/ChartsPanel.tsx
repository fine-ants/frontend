import usePortfolioHoldingChartsQuery from "@api/portfolio/queries/usePortfolioHoldingChartsQuery";
import DividendBarChart from "@components/Portfolio/Charts/DividendBarChart";
import HoldingsPieChart from "@components/Portfolio/Charts/HoldingsPieChart";
import SectorBar from "@components/Portfolio/Charts/SectorBar";
import styled from "styled-components";

type Props = { portfolioId: number };

export default function ChartsPanel({ portfolioId }: Props) {
  const { data: portfolioHoldingCharts } =
    usePortfolioHoldingChartsQuery(portfolioId);

  const { pieChart, dividendChart, sectorChart } = portfolioHoldingCharts;

  return (
    <StyledChartsPanel>
      <HoldingsPieChart data={pieChart} />
      <DividendBarChart data={dividendChart} />
      <SectorBar data={sectorChart} />
    </StyledChartsPanel>
  );
}

const StyledChartsPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
