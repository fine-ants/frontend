import { thousandsDelimiter } from "@utils/thousandsDelimiter";
import { IChartApi, ISeriesApi, LineWidth } from "lightweight-charts";
import { AreaSeries, Chart } from "lightweight-charts-react-wrapper";
import { useEffect, useRef } from "react";

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
    <>
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
            lineColor="#8fcbff"
            lineWidth={1}
            crosshairMarkerVisible={true}
            crosshairMarkerRadius={6}
            ref={seriesRef}
            priceFormat={{
              type: "custom",
              formatter: (price: number) =>
                thousandsDelimiter(Math.floor(price)).toString(),
            }}
          />
        </Chart>
      </div>
    </>
  );
}

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
};
