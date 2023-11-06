import styled from "styled-components";

export default function ValuationOverview() {
  return (
    <StyledValuationOverview>
      <TotalMainContentWrapper>
        <MainText>{currentValues.total.title}</MainText>
        <MainText>₩ {currentValues.total.value}</MainText>
      </TotalMainContentWrapper>
      <TotalSubContentWrapper>
        <SubText>{currentValues.investment.title}</SubText>
        <SubText>₩ {currentValues.investment.value}</SubText>
        <SubText />
      </TotalSubContentWrapper>
      <TotalSubContentWrapper>
        <SubText>{currentValues.profit.title}</SubText>
        <NumWrapper>
          <SubText>{currentValues.profit.value.amount}</SubText>
          <SubText>{currentValues.profit.value.percentage} %</SubText>
        </NumWrapper>
      </TotalSubContentWrapper>
      <TotalSubContentWrapper>
        <SubText>{currentValues.dividends.title}</SubText>
        <NumWrapper>
          <SubText>{currentValues.dividends.value.amount}</SubText>
          <SubText>+ {currentValues.dividends.value.percentage} %</SubText>
        </NumWrapper>
      </TotalSubContentWrapper>
    </StyledValuationOverview>
  );
}

const StyledValuationOverview = styled.div`
  width: 1440px;
  height: 144px;
  display: flex;
  gap: 24px;
  position: absolute;
  top: 112px;
  padding: 0 80px;
  z-index: 3;
`;

const TotalMainContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 330px;
  height: 100%;
`;

const MainText = styled.div`
  font-size: 54px;
  font-weight: bold;
`;

const TotalSubContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 160px;
  // height: 100%;
`;

const NumWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
`;

const SubText = styled.div`
  display: flex;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  height: 48px;
`;

const currentValues = {
  total: {
    title: "총 평가 금액",
    value: 2540000,
  },
  investment: {
    title: "총 투자 금액",
    value: 1273000,
  },
  profit: {
    title: "총 손익",
    value: {
      amount: 1000000,
      percentage: 100,
    },
  },
  dividends: {
    title: "연 배당금",
    value: {
      amount: 200000,
      percentage: 10,
    },
  },
};
