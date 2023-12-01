import { useCallback, useState } from "react";
import { Pie, PieChart as RCPieChart, Sector, Tooltip } from "recharts";
import PortfolioWeightPieChartToolTip from "../../Dashboard/PortfolioWeightPieChart/PortfolioWeightPieChartToolTip";

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

export type PieChartData = {
  id: number;
  name: string;
  valuation: number;
  fill: string;
  totalGain: number;
  totalGainRate: number;
  weight: number;
};

type Props = {
  width: number;
  height: number;
  hoverGap: number;
  pieData: PieChartData[];
};

const TOTAL_INDEX = -1;

export default function PieChart({ width, height, hoverGap, pieData }: Props) {
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
    <RCPieChart width={width} height={height}>
      <Pie
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        data={topTenPieData}
        innerRadius={width / 4}
        outerRadius={width / 2 - hoverGap}
        dataKey="valuation"
        onMouseEnter={isPieDataEmpty ? () => {} : onPieEnter}
        onMouseLeave={onPieLeave}
        startAngle={90}
        endAngle={-450}
        width={width}
      />
      {isPieDataEmpty ? null : (
        <Tooltip
          content={(props) => <PortfolioWeightPieChartToolTip {...props} />}
        />
      )}
    </RCPieChart>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, startAngle, endAngle, fill, width } = props;

  return (
    <>
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={width / 2}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
      </g>
    </>
  );
};
