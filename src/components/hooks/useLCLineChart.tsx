import { formatUnit, thousandsDelimiter } from "@fineants/demolition";
import designSystem from "@styles/designSystem";
import { getBarSpacings } from "@utils/getBarSpacings";
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
import { RefObject, useEffect, useRef } from "react";

type Props = {
  chartContainerRef: RefObject<HTMLDivElement>;
  data: LineData[];
  currentRange: string;
};

export function useLCLineChart({
  chartContainerRef,
  data,
  currentRange,
}: Props) {
  const chartRef = useRef<IChartApi | null>(null);

  useEffect(() => {
    if (chartContainerRef.current) {
      // 차트 설정 및 생성 로직
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

      // 시리즈 설정 및 추가 로직
      const seriesOptions: LineSeriesPartialOptions = {
        color: designSystem.color.primary.blue500,
        lineWidth: 2,
        crosshairMarkerVisible: true,
        priceLineVisible: false,
        lastValueVisible: false,
        priceFormat: {
          type: "custom",
          formatter: (price: number) =>
            formatUnit(Math.floor(price)).toString(),
        },
      };
      const series = chart.addLineSeries(seriesOptions);
      series.setData(data);

      // 툴팁 설정 로직
      setupTooltip({ chart, chartContainerRef, series });

      // 차트 시간 스케일 설정
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
  }, [data, currentRange, chartContainerRef]);
}

type setupTooltipProps = {
  chart: IChartApi;
  chartContainerRef: RefObject<HTMLDivElement>;
  series: ISeriesApi<"Line">;
};

function setupTooltip({ chart, chartContainerRef, series }: setupTooltipProps) {
  if (chartContainerRef.current) {
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    chart.subscribeCrosshairMove((param: any) => {
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
            <div style="
              font: ${designSystem.font.title5.font};
              letterSpacing: ${designSystem.font.title5.letterSpacing};
              color: ${designSystem.color.neutral.gray600};
            ">
              ${dateStr}
            </div>
            <div style="
              font: ${designSystem.font.title5.font};
              letterSpacing: ${designSystem.font.title5.letterSpacing};
              color: ${designSystem.color.neutral.gray800};
            ">
              ₩${thousandsDelimiter(Math.round(100 * price) / 100)}
            </div>
          `;

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
}
