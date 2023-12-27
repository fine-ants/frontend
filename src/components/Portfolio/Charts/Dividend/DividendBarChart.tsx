import { PortfolioHoldingsDividendChartItem } from "@api/portfolio/types";
import designSystem from "@styles/designSystem";
import { useState } from "react";
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import DividendBarTooltip from "./DividendBarTooltip";
import RoundedBarShape from "./RoundedBarShape";

type Props = {
  data: PortfolioHoldingsDividendChartItem[];
};

export default function DividendBarChart({ data }: Props) {
  const [currentMonthIndex, setCurrentMonthIndex] = useState(
    new Date().getMonth()
  );

  const selectBar = (index: number) => {
    setCurrentMonthIndex(index);
  };

  return (
    <ResponsiveContainer width={400} height={234}>
      <BarChart width={390} height={180} data={data}>
        <XAxis
          dataKey="name"
          tickLine={false}
          axisLine={{
            stroke: designSystem.color.neutral.gray400,
            strokeWidth: 0.5,
          }}
          fontSize={"12px"}
          fontWeight={"400"}
          tick={{ fill: designSystem.color.neutral.gray400 }}
          tickMargin={8}
        />
        <Bar
          dataKey="amount"
          barSize={16}
          isAnimationActive={false}
          shape={<RoundedBarShape radius={4} />}
          activeBar={<RoundedBarShape isHover={true} radius={4} />}>
          {data.map((data, index) => (
            <Cell
              cursor="pointer"
              fill={
                data.amount === 0
                  ? designSystem.color.neutral.white
                  : index === currentMonthIndex
                  ? designSystem.color.primary.blue500
                  : designSystem.color.primary.blue50
              }
              key={`cell-${index}`}
              onClick={() => selectBar(index)}
            />
          ))}
        </Bar>
        {currentMonthIndex !== null && (
          <Tooltip cursor={false} content={<DividendBarTooltip />} />
        )}
      </BarChart>
    </ResponsiveContainer>
  );
}
