import { useMemo, useState } from "react";
import { Bar, BarChart, Cell, ResponsiveContainer, XAxis } from "recharts";
import styled from "styled-components";

export default function DividendBarChart() {
  const [currentMonthIndex, setCurrentMonthIndex] = useState(
    new Date().getMonth()
  );

  const selectBar = (index: number) => {
    setCurrentMonthIndex(index);
  };

  const modifiedData = data.map((d) => ({
    ...d,
    displayAmount: d.amount === 0 ? 10000 : d.amount,
  }));

  return (
    <StyledDividendBarChart>
      <div>
        <div style={{ fontSize: "22px", fontWeight: "semiBold" }}>
          월 배당금
        </div>
        <div style={{ fontSize: "16px" }}>단위: 만원</div>
      </div>
      <ResponsiveContainer width="100%" height={188}>
        <BarChart width={516} height={188} data={modifiedData}>
          <XAxis
            dataKey="name"
            tickLine={false}
            axisLine={false}
            fontSize={"16px"}
            tick={{ fill: "#375180" }}
          />
          <Bar
            dataKey="displayAmount"
            activeBar={true}
            barSize={32}
            label={<CustomBarLabel />}
            shape={<RoundedBar radius={8} />}>
            {data.map((data, index) => (
              <Cell
                cursor="pointer"
                fill={
                  data.amount === 0
                    ? "#D3D6E2"
                    : index === currentMonthIndex
                    ? "#5eb6ff"
                    : "#bbdfff"
                }
                key={`cell-${index}`}
                onClick={() => selectBar(index)}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </StyledDividendBarChart>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function RoundedBar(props: any) {
  const { fill, x, y, width, height, index, onClick, radius } = props;

  const path = useMemo(() => {
    return `M${x},${y + radius}
            Q${x},${y} ${x + radius},${y}
            L${x + width - radius},${y}
            Q${x + width},${y} ${x + width},${y + radius}
            L${x + width},${y + height}
            L${x},${y + height}
            Z`;
  }, [x, y, width, height, radius]);

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
function CustomBarLabel(props: any) {
  const { x, y, width, index } = props;

  return (
    <text
      x={x + width / 2}
      y={y - 8}
      fill="black"
      fontSize="12px"
      textAnchor="middle"
      dominantBaseline="middle">
      {data[index].amount}
    </text>
  );
}

const StyledDividendBarChart = styled.div`
  width: 600px;
  height: 300px;
  padding: 16px 24px;
  background-color: white;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  box-shadow: 0px 0px 12px 0px #00000014;
`;

// ?: API를 따로 만들건지 포트폴리오 종목 조회에서 아래에 필요한 값들을 추가할것인지
const data = [
  {
    name: "1월",
    amount: 50000,
  },
  {
    name: "2월",
    amount: 22100,
  },
  {
    name: "3월",
    amount: 13500,
  },
  {
    name: "4월",
    amount: 45000,
  },
  {
    name: "5월",
    amount: 75000,
  },
  {
    name: "6월",
    amount: 0,
  },
  {
    name: "7월",
    amount: 21000,
  },
  {
    name: "8월",
    amount: 35000,
  },
  {
    name: "9월",
    amount: 12000,
  },
  {
    name: "10월",
    amount: 45000,
  },
  {
    name: "11월",
    amount: 89000,
  },
  {
    name: "12월",
    amount: 35000,
  },
];
