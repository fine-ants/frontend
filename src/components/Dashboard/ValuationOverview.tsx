import usePortfolioListQuery from "@api/portfolio/queries/usePortfolioListQuery";
import { thousandsDelimiter } from "@utils/thousandsDelimiter";
import styled from "styled-components";

export default function ValuationOverview() {
  const { data: portfolioListData } = usePortfolioListQuery();

  const totalValuation = portfolioListData?.portfolios?.reduce(
    (acc, portfolio) => {
      return acc + portfolio.budget;
    },
    0
  );

  const totalInvestment = portfolioListData?.portfolios?.reduce(
    (acc, portfolio) => {
      return acc + portfolio.dailyGain;
      //TODO: 투자금액은 현재 포폴 데이터에 없어서 일단 총 손익으로 넣어놓음
    },
    0
  );

  const totalDailyGain = portfolioListData?.portfolios?.reduce(
    (acc, portfolio) => {
      return acc + portfolio.dailyGain;
    },
    0
  );

  const totalDividends = portfolioListData?.portfolios?.reduce(
    (acc, portfolio) => {
      return acc + portfolio.expectedMonthlyDividend;
    },
    0
  );

  return (
    <StyledValuationOverview>
      <TotalMainContentWrapper
        style={{
          justifyContent: "flex-start",
          gap: "16px",
          padding: "24px 8",
        }}>
        <Title style={{ marginRight: "auto" }}>총 평가 금액</Title>
        <ValueWrapper style={{ marginRight: "auto" }}>
          <Won style={{ fontSize: "38px" }}>₩</Won>
          <Value style={{ fontSize: "58px" }}>
            {thousandsDelimiter(totalValuation ?? 0)}
          </Value>
        </ValueWrapper>
      </TotalMainContentWrapper>
      <TotalSubContentWrapper>
        <Title>총 투자 금액</Title>
        <ValueWrapper>
          <Won>₩</Won>
          <Value>{thousandsDelimiter(totalInvestment ?? 0)}</Value>
        </ValueWrapper>
      </TotalSubContentWrapper>
      <TotalSubContentWrapper>
        <Title>총 손익</Title>
        <ValueWrapper>
          <Won>₩</Won>
          <Value>{thousandsDelimiter(totalDailyGain ?? 0)}</Value>
        </ValueWrapper>
        <TotalValueRate>
          ↑{100}%
          {/* 총 손익 / 총 투자금액으로 계산한 수익률 총 투자금액이 없어서 계산안됨 */}
        </TotalValueRate>
      </TotalSubContentWrapper>
      <TotalSubContentWrapper>
        <Title>연 배당금</Title>
        <ValueWrapper>
          <Won>₩</Won>
          <Value>{thousandsDelimiter(totalDividends ?? 0)}</Value>
        </ValueWrapper>
        <DividendsRate>
          {10}%{/* TODO: 연 배당금 퍼센티지 값 없음 */}
        </DividendsRate>
      </TotalSubContentWrapper>
    </StyledValuationOverview>
  );
}

const StyledValuationOverview = styled.div`
  width: 1440px;
  height: 240px;
  display: flex;
  align-items: center;
  position: relative;
  gap: 16px;

  padding: 32px;
  z-index: 3;
  background-color: #081538;
  color: white;
  border-radius: 8px;
`;

const TotalMainContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 424px;
  height: 176px;
  color: white;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 100;
  color: #c6c9ee;
`;

const ValueWrapper = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

const Won = styled.div`
  font-size: 24px;
  color: #9fa7e2;
`;
const Value = styled.div`
  font-size: 28px;
  font-weight: bold;
`;

const ValueRate = styled.div`
  display: flex;
  align-items: center;
  height: 24px;
  border-radius: 4px;
  padding: 4px 8px;
  max-width: fit-content;
`;

const TotalValueRate = styled(ValueRate)`
  color: #1eda53;
  background-color: rgba(30, 218, 83, 0.2);
`;

const DividendsRate = styled(ValueRate)`
  color: #fc9a28;
  background-color: rgba(252, 154, 40, 0.2);
`;

const TotalSubContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 296px;
  height: 176px;
  background-color: rgba(255, 255, 255, 0.04);
  border-radius: 8px;
  padding: 24px;
`;
