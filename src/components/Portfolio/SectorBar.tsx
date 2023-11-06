import Legend from "@components/common/PieChart/Legend";
import styled from "styled-components";
import { chartColorPalette } from "styles/chartColorPalette";

export default function SectorBar() {
  const coloredData = data.map((item, index) => ({
    ...item,
    fill: chartColorPalette[index],
  }));

  const totalValuation = coloredData.reduce((acc, cur) => acc + cur.value, 0);
  const sectorBarWidth = 552;

  return (
    <StyledSectorBar>
      <div>섹터 구성</div>
      <Bar $sectorBarWidth={sectorBarWidth}>
        {coloredData.map((d, index) => (
          <div
            key={index}
            style={{
              width: (d.value / totalValuation) * sectorBarWidth,
              height: "100%",
              backgroundColor: chartColorPalette[index],
            }}
          />
        ))}
      </Bar>
      <Legend style={legendStyle} pieData={coloredData} />
    </StyledSectorBar>
  );
}

const StyledSectorBar = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
  height: 174px;
  padding: 16px 24px;
  background-color: white;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  box-sizing: border-box;
  flex-wrap: wrap;
  position: relative;
  justify-content: space-between;
  box-shadow: 0px 0px 12px 0px #00000014;
`;

const Bar = styled.div<{ $sectorBarWidth: number }>`
  display: flex;
  width: ${({ $sectorBarWidth }) => $sectorBarWidth}px;
  height: 20px;
  border-radius: 8px;
  overflow: hidden;
`;

const legendStyle = {
  position: "relative" as const,
};

// ?: 애초에 계산된 값을 줄 건지 종목을 보내면 계산해서 타나내는건지
const data = [
  { name: "IT", value: 4000 },
  { name: "제조", value: 3000 },
  { name: "금융", value: 2000 },
  { name: "소비재", value: 1000 },
  { name: "에너지", value: 1000 },
  { name: "기타", value: 1000 },
];
