import { PortfolioHolding } from "@api/portfolio";
import Legend from "@components/common/PieChart/Legend";
import { thousandsDelimiter } from "@utils/thousandsDelimiter";
import { useCallback, useState } from "react";
import { Pie, PieChart, Sector } from "recharts";
import styled from "styled-components";
import { chartColorPalette } from "styles/chartColorPalette";

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
  data: PortfolioHolding[];
};

const DEFAULT_ACTIVE_INDEX = -1;

export default function HoldingsPieChart({ data }: Props) {
  const pieData = data.map((item, index) => {
    return {
      name: item.companyName,
      value: item.currentValuation,
      fill: chartColorPalette[index],
    };
  });
  const totalValuation = pieData.reduce((acc, cur) => acc + cur.value, 0);

  const [activeIndex, setActiveIndex] = useState(DEFAULT_ACTIVE_INDEX);
  const onPieEnter = useCallback(
    (_: PieEntry, index: number) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  const onPieLeave = useCallback(() => {
    setActiveIndex(DEFAULT_ACTIVE_INDEX);
  }, [setActiveIndex]);

  return (
    <StyledHoldingsPieChart>
      {activeIndex === DEFAULT_ACTIVE_INDEX && (
        <TotalValue>
          <p>총 자산 현황</p>
          <div>{thousandsDelimiter(totalValuation)}</div>
        </TotalValue>
      )}
      <PieChartWrapper>
        <PieChart width={250} height={250}>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={pieData}
            cx={125}
            cy={125}
            innerRadius={65}
            outerRadius={100}
            fill="#FFFFFF"
            dataKey="value"
            onMouseEnter={onPieEnter}
            onMouseLeave={onPieLeave}
          />
        </PieChart>
      </PieChartWrapper>
      <Legend
        pieData={pieData}
        style={{ top: "130px", position: "relative" }}
      />
    </StyledHoldingsPieChart>
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
    payload,
  } = props;

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
        outerRadius={outerRadius + 2}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
};

const StyledHoldingsPieChart = styled.div`
  width: 600px;
  height: 318px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  background-color: #ffffff;
  box-shadow: 0px 0px 12px 0px #00000014;
`;
const TotalValue = styled.div`
  display: flex;
  flex-direction: column;

  position: absolute;
  top: 39%;
  left: 45%;
  z-index: 3;
  > p {
    font-size: 15px;
    font-weight: bold;
    color: #000000;
  }

  > div {
    display: flex;
    justify-content: center;
    font-size: 14px;
    font-weight: bold;
    color: #000000;
  }
`;

const PieChartWrapper = styled.div`
  top: 10px;
  width: 250px;
  height: 250px;
  position: absolute;
`;
