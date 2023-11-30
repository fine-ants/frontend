import { PortfolioPieChartData } from "@api/dashboard";
import { thousandsDelimiter } from "@utils/thousandsDelimiter";
import { useCallback, useState } from "react";
import { Pie, PieChart, Sector, Tooltip } from "recharts";
import styled from "styled-components";
import PortfolioWeightPieChartToolTip from "./PortfolioWeightPieChartToolTip";

type PieEntry = {
  percent: number;
  cornerRadius?: number;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tooltipPayload: any[];
  midAngle: number;
  cx: number;
  cy: number;
  endAngle: number;
  fill: string;
  innerRadius: number;
  maxRadius: number;
  outerRadius: number;

  startAngle: number;
  stroke: string;
  tooltipPosition: {
    x: number;
    y: number;
  };
  value: number;
};

type Props = {
  width: number;
  height: number;
  pieData: PortfolioPieChartData[];
};

const TOTAL_INDEX = -1;

export default function PortfolioWeightPieChart({
  width,
  height,
  pieData,
}: Props) {
  const isPieDataEmpty = pieData.length === 0;

  const [activeIndex, setActiveIndex] = useState(TOTAL_INDEX);
  const onPieEnter = useCallback(
    (_: PieEntry, index: number) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  const onPieLeave = useCallback(() => {
    setActiveIndex(TOTAL_INDEX);
  }, [setActiveIndex]);

  const topTenSlices = pieData.slice(0, 10);
  const remainingPortfolios = pieData.slice(10);
  const remainingSlice = remainingPortfolios.reduce(
    (remSlice, portfolio) => {
      return {
        ...remSlice,
        valuation: remSlice.valuation + portfolio.valuation,
        totalGain: remSlice.totalGain + portfolio.totalGain,
        totalGainRate: remSlice.totalGainRate + portfolio.totalGainRate,
        weight: remSlice.weight + portfolio.weight,
      };
    },
    {
      name: "기타",
      fill: "#B7B8C3",
      valuation: 0,
      totalGain: 0,
      totalGainRate: 0,
      weight: 0,
    }
  );

  const topTenPieData = isPieDataEmpty
    ? [
        {
          name: "",
          fill: "#B7B8C3",
          valuation: 1,
          totalGain: 0,
          totalGainRate: 0,
          weight: 0,
        },
      ]
    : [...topTenSlices, remainingSlice];

  return (
    <>
      {activeIndex === TOTAL_INDEX ? (
        <TotalValue>
          <p>총 자산 현황</p>
          <div>
            {thousandsDelimiter(
              pieData.reduce((acc, cur) => acc + cur.valuation, 0)
            )}
          </div>
        </TotalValue>
      ) : null}
      <PieChartWrapper>
        <PieChart width={width} height={height}>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={topTenPieData}
            cx={width / 2 - 5}
            cy={height / 2 - 5}
            innerRadius={80}
            outerRadius={144}
            dataKey="valuation"
            onMouseEnter={isPieDataEmpty ? () => {} : onPieEnter}
            onMouseLeave={onPieLeave}
            startAngle={90}
            endAngle={-450}
          />
          {isPieDataEmpty ? null : (
            <Tooltip
              content={(props) => <PortfolioWeightPieChartToolTip {...props} />}
            />
          )}
        </PieChart>
      </PieChartWrapper>
    </>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderActiveShape = (props: any) => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    // payload,
  } = props;

  return (
    <>
      <g>
        //TODO: 디자인 확정안됨 원 가운데 텍스트임
        {/* <text
          style={{ fontSize: "15px", fontWeight: "bold" }}
          x={cx}
          y={cy - 3}
          textAnchor="middle"
          fill={"black"}>
          {payload.name}
        </text>
        <text
          style={{ fontSize: "15px", fontWeight: "bold" }}
          x={cx}
          y={cy + 18}
          textAnchor="middle"
          fill={"black"}>
          {thousandsDelimiter(payload.value)}
        </text> */}
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 16}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
      </g>
    </>
  );
};

const TotalValue = styled.div`
  display: flex;
  flex-direction: column;

  position: absolute;
  top: 47%;
  left: 19%;
  z-index: 3;
  > p {
    font: ${({ theme: { font } }) => font.heading3};
    color: #000000;
  }

  > div {
    display: flex;
    justify-content: center;
    font-size: 15px;
    font-weight: bold;
    color: #000000;
  }
`;

const PieChartWrapper = styled.div`
  position: relative;
`;
