import { IChartApi, ISeriesApi, LineWidth } from "lightweight-charts";
import { AreaSeries, Chart } from "lightweight-charts-react-wrapper";
import { useEffect, useRef } from "react";
import styled from "styled-components";

//TODO: 예시로 사용하는 데이터가 time,value인데 수가 너무 많아서 나중에 자체 데이터 사용할 때 date,valueation으로 수정
type HistoricalValuation = {
  time: string;
  value: number;
};

type Props = {
  data: HistoricalValuation[];
  currentRangeIndex: number;
};

export default function TotalValuationLineChart({
  data,
  currentRangeIndex,
}: Props) {
  const seriesRef = useRef<ISeriesApi<"Area">>(null);
  const chartRef = useRef<IChartApi>(null);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.timeScale().fitContent();
    }
  }, [currentRangeIndex]);

  return (
    <StyledTotalValuationLineChart>
      <h1 style={{ fontSize: "20px", fontWeight: "bold" }}>
        총 자산 현황 추이
      </h1>
      <div style={{ position: "relative" }}>
        <Chart
          {...{
            ...options,
            timeScale: {
              barSpacing: barSpacings[currentRangeIndex],
            },
          }}
          ref={chartRef}>
          <AreaSeries
            data={data}
            topColor="#2175ec"
            bottomColor="#8fcbff"
            lineColor="#2175ec"
            lineWidth={2}
            crosshairMarkerVisible={true}
            crosshairMarkerRadius={4}
            ref={seriesRef}
          />
        </Chart>
      </div>
    </StyledTotalValuationLineChart>
  );
}

const StyledTotalValuationLineChart = styled.div`
  width: 688px;
  height: 384px;
  background-color: #ffffff;
  border-radius: 10px;
  border: 1px solid #000000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const barSpacings = [6, 7, 9, 16, 33, 62];
// TODO: 숫자들은 상수로 빼기 ex) "1DSpace", "1WSpace", "1MSpace", or "1D", "1W", "1M"

const options = {
  width: 500,
  height: 300,

  layout: {
    textColor: "black",
    backgroundColor: "#000000",
  },
  rightPriceScale: {
    scaleMargins: {
      top: 0.3,
      bottom: 0.25,
    },
  },
  crosshair: {
    vertLine: {
      width: 1 as LineWidth,
      color: "black",
      style: 3,
    },
    horzLine: {
      visible: true,
      labelVisible: true,
    },
  },
  grid: {
    vertLines: {
      color: "transparent",
    },
    horzLines: {
      color: "transparent",
    },
  },
  // timeScale: {
  //   barSpacing: barSpacings[currentRangeIndex],
  // },
};
