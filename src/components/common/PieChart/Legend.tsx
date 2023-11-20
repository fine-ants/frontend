import styled from "styled-components";
import LegendItem from "./LegendItem";

import { PieChartData } from "@pages/DashboardPage";
import { CSSProperties } from "react";
import { chartColorPalette } from "styles/chartColorPalette";

type Props = {
  pieData: PieChartData[];
  style?: CSSProperties;
};
export default function Legend({ pieData, style }: Props) {
  const valueSum = pieData.reduce((acc, cur) => acc + cur.value, 0);
  const etcValueSum = pieData
    .slice(11)
    .reduce((acc, item) => acc + item.value, 0);

  return (
    <StyledLegend style={style}>
      <Content>
        <PortfolioList>
          {pieData ? (
            pieData
              .slice(0, 10)
              .map((item) => (
                <LegendItem
                  key={item.name}
                  color={item.fill}
                  title={item.name}
                  percent={Math.floor((item.value / valueSum) * 100)}
                />
              ))
          ) : (
            <div>로딩중</div>
            // TODO: 로딩인디케이터
          )}
        </PortfolioList>
        <EtcListContainer>
          <LegendItem
            color={chartColorPalette[chartColorPalette.length - 1]}
            title={"기타"}
            percent={Math.trunc((etcValueSum / valueSum) * 100)}
          />
          <EtcList>
            {pieData.slice(11).map((item) => (
              <EtcItem>
                <div>{item.name}</div>
                <div>{Math.trunc((item.value / valueSum) * 100)}%</div>
              </EtcItem>
            ))}
          </EtcList>
        </EtcListContainer>
      </Content>
    </StyledLegend>
  );
}

const StyledLegend = styled.div`
  width: 300px;
  height: 363px;
  gap: 10px;
  padding: 24px 0;
  border: 1px solid ${({ theme: { color } }) => color.neutral.gray100};
  border-radius: 8px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 315px;
  overflow-y: auto;
  padding: 0 24px;
  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme: { color } }) => color.neutral.gray200};
    border-radius: 2px; /* 스크롤바의 모서리를 둥글게 */
  }
`;

const PortfolioList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  background-color: #ffffff;
  padding-bottom: 10px;
  border-bottom: 1px solid #e0e2ec;
`;

const EtcListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  background-color: #ffffff;
  padding-top: 10px;
`;

const EtcList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-left: 4px;
  padding-left: 12px;
  border-left: 2px solid ${({ theme: { color } }) => color.neutral.gray200};
`;

const EtcItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font: ${({ theme: { font } }) => font.title5};
  color: ${({ theme: { color } }) => color.neutral.gray600};
`;
