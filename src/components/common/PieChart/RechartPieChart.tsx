import { thousandsDelimiter } from "@utils/thousandsDelimiter";
import { useCallback, useState } from "react";
import { Pie, PieChart, Sector } from "recharts";
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
  paddingAngle: number;
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
  pieData: { name: string; value: number }[];
};

const TOTAL_INDEX = -1;
const TOTAL_ASSET = 6000030; // TODO: api 아직 없음

export default function RechartPieChart({ width, height, pieData }: Props) {
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

  return (
    <>
      {activeIndex === TOTAL_INDEX ? (
        <TotalValue>
          <p>총 자산 현황</p>
          <div>{thousandsDelimiter(TOTAL_ASSET)}</div>
        </TotalValue>
      ) : null}
      <PieChartWrapper>
        <PieChart width={width} height={height}>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={pieData}
            cx={200}
            cy={168}
            innerRadius={80}
            outerRadius={132}
            fill="#FFFFFF"
            dataKey="value"
            onMouseEnter={onPieEnter}
            onMouseLeave={onPieLeave}
          />
        </PieChart>
      </PieChartWrapper>
    </>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderActiveShape = (props: any) => {
  // const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    // midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    // percent,
    // value,
  } = props;
  // const sin = Math.sin(-RADIAN * midAngle);
  // const cos = Math.cos(-RADIAN * midAngle);
  // const sx = cx + (outerRadius + 10) * cos;
  // const sy = cy + (outerRadius + 10) * sin;
  // const mx = cx + (outerRadius + 30) * cos;
  // const my = cy + (outerRadius + 30) * sin;
  // const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  // const ey = my;
  // const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text
        style={{ fontSize: "18px", fontWeight: "bold" }}
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
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 5}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      // TODO: 차트 활용할 때 다시 한 번 참고해보려고 남겨둠
      {/* <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      /> */}
      {/* <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      /> */}
      {/* <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" /> */}
      {/* <text
        x={ex + (cos >= 0 ? 1 : -1) * 2}
        y={ey}
        textAnchor={textAnchor}
        fill="#333">{`${(percent * 100).toFixed(2)}%`}</text> */}
      {/* <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999">
        {`${(percent * 100).toFixed(2)}%`}
      </text> */}
    </g>
  );
};

const TotalValue = styled.div`
  display: flex;
  flex-direction: column;

  position: absolute;
  top: 40%;
  left: 43%;
  z-index: 3;
  > p {
    font-size: 18px;
    font-weight: bold;
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
  position: absolute;
`;
