import { PortfolioHoldingsDividendChartItem } from "@api/portfolio/types";
import designSystem from "@styles/designSystem";
import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import styled from "styled-components";

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
          shape={<RoundedBar radius={4} />}
          activeBar={<ActiveBar radius={4} />}>
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
          <Tooltip cursor={false} content={<CustomTooltip />} />
        )}
      </BarChart>
    </ResponsiveContainer>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function RoundedBar(props: any) {
  const { fill, x, y, width, height, index, onClick, radius } = props;

  // Adjust the y position to create a gap
  const adjustedY = y - 8; // Increase this value to push the bar down

  const path = useMemo(() => {
    return `
      M${x + radius},${adjustedY} 
      L${x + width - radius},${adjustedY} 
      Q${x + width},${adjustedY} ${x + width},${adjustedY + radius}
      L${x + width},${adjustedY + height - radius} 
      Q${x + width},${adjustedY + height} ${x + width - radius},${
        adjustedY + height
      }
      L${x + radius},${adjustedY + height} 
      Q${x},${adjustedY + height} ${x},${adjustedY + height - radius}
      L${x},${adjustedY + radius} 
      Q${x},${adjustedY} ${x + radius},${adjustedY}
      Z`;
  }, [x, adjustedY, width, height, radius]);

  return (
    <path
      cursor={"pointer"}
      d={path}
      fill={fill}
      onClick={() => onClick(index)}
    />
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ActiveBar(props: any) {
  const { x, y, width, height, index, onClick, radius } = props;

  // Adjust the y position to create a gap
  const adjustedY = y - 8; // Increase this value to push the bar down

  const path = useMemo(() => {
    return `
      M${x + radius},${adjustedY} 
      L${x + width - radius},${adjustedY} 
      Q${x + width},${adjustedY} ${x + width},${adjustedY + radius}
      L${x + width},${adjustedY + height - radius} 
      Q${x + width},${adjustedY + height} ${x + width - radius},${
        adjustedY + height
      }
      L${x + radius},${adjustedY + height} 
      Q${x},${adjustedY + height} ${x},${adjustedY + height - radius}
      L${x},${adjustedY + radius} 
      Q${x},${adjustedY} ${x + radius},${adjustedY}
      Z`;
  }, [x, adjustedY, width, height, radius]);

  return (
    <path
      cursor={"pointer"}
      d={path}
      fill={designSystem.color.primary.blue200}
      onClick={() => onClick(index)}
    />
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const currentYear = new Date().getFullYear();
    const month = parseInt(label.split("월")[0], 10);
    // 월이 10보다 작으면 앞에 '0'을 붙임
    const formattedMonth = month.toString().padStart(2, "0");
    return (
      <StyledCustomTooltip>
        <label>
          {currentYear}-{formattedMonth}
        </label>
        <span>{payload[0].value}원</span>
      </StyledCustomTooltip>
    );
  }

  return null;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any

const StyledCustomTooltip = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  background-color: ${({ theme: { color } }) => color.neutral.white};
  border-radius: 4px;
  padding: 8px;
  border: 1px solid ${({ theme: { color } }) => color.neutral.gray100};
  box-shadow: 0px 0px 12px 0px #00000014;

  > label {
    font: ${({ theme: { font } }) => font.body3};
    color: ${({ theme: { color } }) => color.neutral.gray600};
  }

  > span {
    font: ${({ theme: { font } }) => font.title5};
    color: ${({ theme: { color } }) => color.neutral.gray800};
  }
`;
