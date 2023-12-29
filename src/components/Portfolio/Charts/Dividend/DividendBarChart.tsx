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

  const hasNoDividendData = data.length === 0;

  const EmptyDividendData = Array.from({ length: 12 }, (_, index) => ({
    month: index + 1,
    amount: 0,
  }));

  return (
    <ResponsiveContainer width={400} height={234}>
      {hasNoDividendData ? (
        <BarChart width={390} height={180} data={EmptyDividendData}>
          <XAxis
            dataKey="month"
            tickLine={false}
            tickFormatter={(tickItem) => `${tickItem}월`}
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
            {EmptyDividendData.map((data, index) => (
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
        </BarChart>
      ) : (
        <BarChart width={390} height={180} data={data}>
          <XAxis
            dataKey="month"
            tickLine={false}
            tickFormatter={(tickItem) => `${tickItem}월`}
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
      )}
    </ResponsiveContainer>
  );
}
