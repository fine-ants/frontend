import { PortfolioPieChartData } from "@api/dashboard";
import addIcon from "assets/icons/add-icon.svg";
import { CSSProperties } from "react";
import styled from "styled-components";
import { chartColorPalette } from "styles/chartColorPalette";
import LegendItem from "./LegendItem";

type Props = {
  pieData: PortfolioPieChartData[];
  style?: CSSProperties;
};
export default function Legend({ pieData, style }: Props) {
  const isPieDataEmpty = pieData.length === 0;

  const topTenPieList = pieData.slice(0, 10);
  const etcPieList = pieData.slice(10);

  const etcWeight = etcPieList.reduce((acc, item) => acc + item.weight, 0);

  return (
    <StyledLegend style={style} $isPieDataEmpty={isPieDataEmpty}>
      {isPieDataEmpty ? (
        <EmptyPortfolioMessage>
          <h1>포트폴리오를 추가하세요</h1>
          <div style={{ textAlign: "center" }}>
            내가 보유한 포트폴리오 비중이
            <br />
            여기에 표시됩니다
          </div>
          <PortfolioAddButton>
            <img src={addIcon} alt="add-icon" />
            <span>포트폴리오 추가</span>
          </PortfolioAddButton>
        </EmptyPortfolioMessage>
      ) : (
        <Content>
          <PortfolioList>
            {pieData ? (
              topTenPieList.map((item) => (
                <LegendItem
                  key={item.id}
                  color={item.fill}
                  title={item.name}
                  percent={Math.floor(item.weight)}
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
              percent={etcWeight}
            />
            <EtcList>
              {etcPieList.map((item) => (
                <EtcItem key={item.id}>
                  <div>{item.name}</div>
                  <div>{Math.floor(item.weight)}%</div>
                </EtcItem>
              ))}
            </EtcList>
          </EtcListContainer>
        </Content>
      )}
    </StyledLegend>
  );
}

const StyledLegend = styled.div<{ $isPieDataEmpty: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 300px;
  height: 363px;
  gap: 10px;
  padding: 24px 0;
  border: 1px ${({ $isPieDataEmpty }) => ($isPieDataEmpty ? "dashed" : "solid")}
    ${({ theme: { color }, $isPieDataEmpty }) =>
      $isPieDataEmpty ? color.primary.blue100 : color.neutral.gray100};
  border-radius: 8px;
`;

const EmptyPortfolioMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  height: 138px;
  > h1 {
    font: ${({ theme: { font } }) => font.title3};
    color: ${({ theme: { color } }) => color.neutral.gray600};
  }

  > div {
    font: ${({ theme: { font } }) => font.body3};
    color: ${({ theme: { color } }) => color.neutral.gray500};
  }
`;

const PortfolioAddButton = styled.div`
  display: flex;
  margin-inline: auto;
  min-width: 80px;
  height: 32px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  padding: 12px 8px;
  border-radius: 3px;
  font: ${({ theme: { font } }) => font.button2};

  background-color: ${({ theme: { color } }) => color.primary.blue500};
  cursor: pointer;

  > span {
    color: ${({ theme: { color } }) => color.neutral.white};
  }

  &:hover {
    background-color: ${({ theme: { color } }) => color.primary.blue700};
  }
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
  background-color: ${({ theme: { color } }) => color.neutral.white};
  padding-bottom: 10px;
  border-bottom: 1px solid ${({ theme: { color } }) => color.neutral.gray200};
`;

const EtcListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  background-color: ${({ theme: { color } }) => color.neutral.white};
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
