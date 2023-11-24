import formatTickValue from "@utils/formatTickValue";
import { thousandsDelimiter } from "@utils/thousandsDelimiter";
import {
  ChartOptions,
  ColorType,
  CrosshairMode,
  DeepPartial,
  IChartApi,
  ISeriesApi,
  LineData,
  LineSeriesPartialOptions,
  LineStyle,
  createChart,
} from "lightweight-charts";
import { useEffect, useRef } from "react";
import designSystem from "styles/designSystem";

type Props = {
  data: LineData[];
  currentRangeIndex: number;
};

const rangeMapping = ["1D", "1W", "1M", "1Q", "1Y"];

function getBarSpacings(width: number, dataLength: number, range: string) {
  let barSpacing;

  switch (range) {
    case "1D": // 일 단위
      barSpacing = width / 1;
      break;
    case "1W": // 주 단위
      barSpacing = width / 7;
      break;
    case "1M": // 월 단위
      barSpacing = width / 30;
      break;
    case "1Q": // 분기 단위
      barSpacing = width / 90;
      break;
    case "1Y": // 연 단위
      barSpacing = width / 365;
      break;
    default:
      return undefined;
  }

  // 보여지는 데이터의 개수
  const numberOfPoints = width / barSpacing;

  // 데이터의 개수가 보여지는 데이터의 개수보다 적으면 barSpacing을 1로 설정
  if (numberOfPoints > dataLength) {
    barSpacing = width / dataLength;
  }

  return Math.max(1, barSpacing);
}

export default function TotalValuationLineChart({
  data,
  currentRangeIndex,
}: Props) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);

  const currentRange = rangeMapping[currentRangeIndex];

  useEffect(() => {
    if (chartContainerRef.current) {
      const chartOptions: DeepPartial<ChartOptions> = {
        layout: {
          textColor: designSystem.color.neutral.gray400,
          background: {
            type: ColorType.Solid,
            color: designSystem.color.neutral.white,
          },
          fontFamily: "IBM Plex Sans",
          fontSize: 14,
        },
        rightPriceScale: {
          visible: false,
        },
        crosshair: {
          mode: CrosshairMode.Normal,
          horzLine: {
            visible: false,
            labelVisible: false,
          },
          vertLine: {
            labelVisible: false,
            style: LineStyle.SparseDotted,
          },
        },
        grid: {
          vertLines: {
            visible: false,
          },
          horzLines: {
            visible: true,
            color: designSystem.color.neutral.gray100,
          },
        },
        timeScale: {
          borderColor: designSystem.color.neutral.gray400,
        },
        leftPriceScale: {
          visible: true,
          scaleMargins: {
            top: 0.3,
            bottom: 0.25,
          },
          borderVisible: false,
        },
      };

      const chart = createChart(chartContainerRef.current, chartOptions);
      chartRef.current = chart;

      const seriesOptions: LineSeriesPartialOptions = {
        color: designSystem.color.primary.blue500,
        lineWidth: 2,
        crosshairMarkerVisible: true,
        priceLineVisible: false,
        lastValueVisible: false,
        priceFormat: {
          type: "custom",
          formatter: (price: number) =>
            formatTickValue(Math.floor(price)).toString(),
        },
      };

      const series: ISeriesApi<"Line"> = chart.addLineSeries(seriesOptions);

      series.setData(data);

      const toolTip = chartContainerRef.current.querySelector("#chart-tooltip");
      if (!toolTip) {
        const toolTip = document.createElement("div");

        toolTip.style.position = "absolute";
        toolTip.style.display = "flex";
        toolTip.style.flexDirection = "column";
        toolTip.style.gap = "8px";
        toolTip.style.padding = "8px";
        toolTip.style.boxSizing = "border-box";
        toolTip.style.fontSize = "12px";
        toolTip.style.textAlign = "left";
        toolTip.style.zIndex = "1";
        toolTip.style.top = "12px";
        toolTip.style.left = "12px";
        toolTip.style.pointerEvents = "none";
        toolTip.style.border = "1px solid";
        toolTip.style.borderRadius = "4px";
        toolTip.style.fontFamily =
          "-apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif";

        toolTip.style.background = "white";
        toolTip.style.color = "black";
        toolTip.style.borderColor = designSystem.color.neutral.gray100;

        chartContainerRef.current.appendChild(toolTip);

        chart.subscribeCrosshairMove((param) => {
          if (!chartContainerRef.current) {
            return;
          }

          if (
            param.point === undefined ||
            !param.time ||
            param.point.x < 0 ||
            param.point.x > chartContainerRef.current.clientWidth ||
            param.point.y < 0 ||
            param.point.y > chartContainerRef.current.clientHeight
          ) {
            toolTip.style.display = "none";
          } else {
            const dateStr = param.time;
            toolTip.style.display = "flex";
            const data = param.seriesData.get(series);

            if (data && "value" in data) {
              const price = data.value;
              toolTip.innerHTML = `
            <div style="color: ${designSystem.color.neutral.gray600}"
            font: ${designSystem.font.title5};>
            ${dateStr}
            </div>
            <div style="font: ${designSystem.font.title5};  color: ${
              designSystem.color.neutral.gray800
            }">
              ₩${thousandsDelimiter(Math.round(100 * price) / 100)}
              </div>`;

              let left = param.point.x + 15;
              if (left > chartContainerRef.current.clientWidth - 80) {
                left = param.point.x - 95;
              }

              let top = param.point.y + 15;
              if (top > chartContainerRef.current.clientHeight - 80) {
                top = param.point.y - 95;
              }
              toolTip.style.left = left + "px";
              toolTip.style.top = 150 + top + "px";
            }
          }
        });
      }
      chart.timeScale().fitContent();
      chart.timeScale().applyOptions({
        barSpacing: getBarSpacings(616, data.length, currentRange),
      });
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
      }
    };
  }, [data, currentRange]);

  return (
    <div
      ref={chartContainerRef}
      style={{ width: "100%", height: "100%", overflow: "hidden" }}
    />
  );
}
