import { PieChartData } from "@pages/DashboardPage";
import { thousandsDelimiter } from "@utils/thousandsDelimiter";
import { useCallback, useState } from "react";
import { Pie, PieChart, Sector, Tooltip } from "recharts";
import styled from "styled-components";

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
  coloredPieData: PieChartData[];
};

const TOTAL_INDEX = -1;

export default function PortfolioPieChart({
  width,
  height,
  coloredPieData,
}: Props) {
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

  const finalPieData = [
    ...coloredPieData.slice(0, 10),
    {
      name: "기타",
      value: coloredPieData
        .slice(11)
        .reduce((acc, item) => acc + item.value, 0),
      fill: "#B7B8C3",
      totalGain: coloredPieData
        .slice(11)
        .reduce((acc, item) => acc + item.totalGain, 0),
      totalGainRate: coloredPieData
        .slice(11)
        .reduce((acc, item) => acc + item.totalGainRate, 0),
    },
  ];

  return (
    <>
      {activeIndex === TOTAL_INDEX ? (
        <TotalValue>
          <p>총 자산 현황</p>
          <div>
            {thousandsDelimiter(
              coloredPieData.reduce((acc, cur) => acc + cur.value, 0)
            )}
          </div>
        </TotalValue>
      ) : null}
      <PieChartWrapper>
        <PieChart width={width} height={height}>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={finalPieData}
            cx={width / 2 - 5}
            cy={height / 2 - 5}
            innerRadius={80}
            outerRadius={144}
            dataKey="value"
            onMouseEnter={onPieEnter}
            onMouseLeave={onPieLeave}
            startAngle={90}
            endAngle={-360}
          />
          <Tooltip
            content={(props) => (
              <CustomTooltip
                {...props}
                totalValue={finalPieData.reduce(
                  (acc, item) => acc + item.value,
                  0
                )}
              />
            )}
          />
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload, totalValue }: any) {
  const totalGain = payload?.[0]?.payload?.totalGain;
  const totalGainRate = payload?.[0]?.payload?.totalGainRate;

  if (active && payload && payload.length) {
    return (
      <TooltipBox>
        <TooltipContainer>
          <ItemTitle>
            <ColorCircle color={payload[0].payload.fill} />
            <p>{payload[0].name}</p>
          </ItemTitle>
          <Percentage>
            {Math.floor((payload[0].value / totalValue) * 100)}%
          </Percentage>
        </TooltipContainer>
        <TooltipContainer>
          ₩{thousandsDelimiter(payload[0].value)}
        </TooltipContainer>
        <TooltipContainer>
          <GainValue>
            {totalGain >= 0 ? "+" : "-"}₩{thousandsDelimiter(totalGain)}
          </GainValue>
          <GainValue>
            {totalGainRate >= 0 ? "+" : "-"}
            {totalGainRate}%
          </GainValue>
        </TooltipContainer>
      </TooltipBox>
    );
  }

  return null;
}

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

const TooltipBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 80px;
  background-color: #ffffff;
  border: 1px solid #e0e2ec;
  border-radius: 4px;
  padding: 8px;
  gap: 4px;
`;

const TooltipContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 17px;
  gap: 16px;
  font-size: 14px;
  line-height: 17px;
`;

const ItemTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  > p {
    font: ${({ theme: { font } }) => font.title5};
    letter-spacing: -0.02em;
    color: ${({ theme: { color } }) => color.neutral.gray600};
  }
`;

const ColorCircle = styled.div<{ color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
`;

const Percentage = styled.div`
  margin-right: auto;
  font: ${({ theme: { font } }) => font.title5};
  letter-spacing: -0.02em;
  color: ${({ theme: { color } }) => color.primary.blue500};
`;

const GainValue = styled.p`
  display: flex;
  align-items: center;
  font: ${({ theme: { font } }) => font.body4};
  color: ${({ theme: { color } }) => color.state.green};
`;
