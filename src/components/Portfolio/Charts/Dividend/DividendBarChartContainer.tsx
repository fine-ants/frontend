import { PortfolioHoldingsDividendChartItem } from "@api/portfolio/types";
import styled from "styled-components";
import DividendBarChart from "./DividendBarChart";

type Props = {
  dividendChart: PortfolioHoldingsDividendChartItem[];
};

export default function DividendBarChartContainer({ dividendChart }: Props) {
  return (
    <StyledDividendBarChartContainer>
      <ChartLabel>월 배당금</ChartLabel>
      <DividendBarChart data={dividendChart} />
    </StyledDividendBarChartContainer>
  );
}

const StyledDividendBarChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const ChartLabel = styled.h1`
  font: ${({ theme: { font } }) => font.heading3};
`;
