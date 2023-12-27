import usePortfolioHoldingChartsQuery from "@api/portfolio/queries/usePortfolioHoldingChartsQuery";
import DividendBarChart from "@components/Portfolio/Charts/DividendBarChart";
import SectorBar from "@components/Portfolio/Charts/SectorBar";
import WideLegend from "@components/common/Legend/WideLegend";
import PieChart from "@components/common/PieChart/PieChart";
import { chartColorPalette } from "@styles/chartColorPalette";
import { useState } from "react";
import styled from "styled-components";

type Props = { portfolioId: number };

export default function ChartsPanel({ portfolioId }: Props) {
  const { data: portfolioHoldingCharts } =
    usePortfolioHoldingChartsQuery(portfolioId);

  const { pieChart, dividendChart, sectorChart } = portfolioHoldingCharts;

  const [hoverSector, setHoverSector] = useState({
    sector: "",
    sectorWeight: 0,
    color: "",
    sectorBarPosition: {
      x: 0,
      y: 0,
    },
  });

  const onHoverSectorBarElement = (
    sector: string,
    sectorWeight: number,
    color: string,
    sectorBarPosition: {
      x: number;
      y: number;
    }
  ) => {
    setHoverSector({
      sector,
      sectorWeight,
      color,
      sectorBarPosition,
    });
  };

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
      <PieChartContainer>
        <ChartLabel>종목 구성</ChartLabel>
        <PieChartWrapper>
          <PieChart
            width={256}
            height={256}
            hoverGap={12.8}
            pieData={coloredPieChart ?? []}
          />
          <WideLegend
            legendList={pieChartLegendList}
            etcOptions={{ title: "기타", numItemsFromFront: 10 }}
          />
        </PieChartWrapper>
      </PieChartContainer>

      <DividendBarChartContainer>
        <ChartLabel>월 배당금</ChartLabel>
        <DividendBarChart data={dividendChart} />
      </DividendBarChartContainer>

      <SectorBarChartContainer>
        <ChartLabel>섹터 구성</ChartLabel>
        <SectorBar
          sectorBarWidth={400}
          data={sectorChart}
          onHoverSectorBarElement={onHoverSectorBarElement}
        />
        <WideLegend
          style={{ height: "68px" }}
          legendList={sectorLegendList}
          etcOptions={{ title: "기타", numItemsFromFront: 10 }}
        />
      </SectorBarChartContainer>
      {hoverSector.sector !== "" && (
        <CustomTooltip $sectorBarPosition={hoverSector.sectorBarPosition}>
          <TitleWrapper>
            <Color $color={hoverSector.color} />
            <SectorTitle>{hoverSector.sector}</SectorTitle>
          </TitleWrapper>
          <Percent>{hoverSector.sectorWeight}%</Percent>
        </CustomTooltip>
      )}
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

const PieChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const PieChartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const ChartLabel = styled.h1`
  font: ${({ theme: { font } }) => font.heading3};
`;

const DividendBarChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const SectorBarChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 24px;
`;

const CustomTooltip = styled.div<{
  $sectorBarPosition: { x: number; y: number };
}>`
  position: absolute;
  left: ${({ $sectorBarPosition }) => $sectorBarPosition.x}px;
  top: ${({ $sectorBarPosition }) => $sectorBarPosition.y}px;

  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;

  background-color: ${({ theme: { color } }) => color.neutral.white};
  border: 1px solid ${({ theme: { color } }) => color.neutral.gray100};
  border-radius: 4px;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.08);
`;

const TitleWrapper = styled.div`
  display: flex;

  gap: 3.5px;
`;

const Color = styled.div<{ $color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ $color }) => $color};
`;

const SectorTitle = styled.span`
  font: ${({ theme: { font } }) => font.title5};
  color: ${({ theme: { color } }) => color.neutral.gray600};
`;

const Percent = styled.span`
  color: ${({ theme: { color } }) => color.primary.blue500};
`;
