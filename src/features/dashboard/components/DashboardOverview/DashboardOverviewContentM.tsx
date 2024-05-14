import RateBadge from "@components/Badges/RateBadge";
import { OverviewData } from "@features/dashboard/api/types";
import { thousandsDelimiter } from "@fineants/demolition";
import designSystem from "@styles/designSystem";
import styled from "styled-components";

type Props = {
  overviewData: OverviewData;
};

export default function DashboardOverviewContentM({ overviewData }: Props) {
  const {
    username,
    totalValuation,
    totalInvestment,
    totalGain,
    totalGainRate,
    totalAnnualDividend,
    totalAnnualDividendYield,
  } = overviewData;

  return (
    <StyledDashboardOverviewContentM>
      <PageTitle>{username} 님의 대시보드</PageTitle>

      <TotalValuationContainer>
        <TotalValuationTitle>총 평가 금액</TotalValuationTitle>
        <TotalValuationWrapper>
          <MainWon>₩</MainWon>
          <TotalValuation>{thousandsDelimiter(totalValuation)}</TotalValuation>
        </TotalValuationWrapper>
      </TotalValuationContainer>

      <SubContentContainer>
        <TotalSubContentWrapper>
          <Title>총 투자 금액</Title>
          <ValueWrapper>
            <Won>₩</Won>
            <Value>{thousandsDelimiter(totalInvestment)}</Value>
          </ValueWrapper>
        </TotalSubContentWrapper>
        <TotalSubContentWrapper>
          <Title>총 손익</Title>
          <ValueWrapper>
            <Won>₩</Won>
            <Value>{thousandsDelimiter(totalGain)}</Value>
          </ValueWrapper>
          <RateBadge size={24} value={totalGainRate} />
        </TotalSubContentWrapper>
        <TotalSubContentWrapper>
          <Title>예상 연 배당금</Title>
          <ValueWrapper>
            <Won>₩</Won>
            <Value>{thousandsDelimiter(totalAnnualDividend)}</Value>
          </ValueWrapper>
          <RateBadge
            size={24}
            value={totalAnnualDividendYield}
            iconStatus={false}
          />
        </TotalSubContentWrapper>
      </SubContentContainer>
    </StyledDashboardOverviewContentM>
  );
}

const StyledDashboardOverviewContentM = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  // align-items: center;
`;

const PageTitle = styled.h1`
  width: 100%;
  margin-bottom: 24px;
  font: ${designSystem.font.heading4.font};
  letter-spacing: ${designSystem.font.heading4.letterSpacing};
`;

const TotalValuationContainer = styled.div`
  width: 100%;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: ${designSystem.color.neutral.white};
`;

const TotalValuationTitle = styled.div`
  // margin-right: auto;
  font: ${designSystem.font.title5.font};
  letter-spacing: ${designSystem.font.title5.letterSpacing};
  color: ${designSystem.color.neutral.gray400};
`;

const MainWon = styled.div`
  font: ${designSystem.font.title2.font};
  letter-spacing: ${designSystem.font.title2.letterSpacing};
  color: ${designSystem.color.neutral.gray600};
`;

const TotalValuationWrapper = styled.div`
  margin-right: auto;
  display: flex;
  gap: 4px;
  align-items: center;
`;

const TotalValuation = styled.div`
  font: ${designSystem.font.heading1.font};
  letter-spacing: ${designSystem.font.heading1.letterSpacing};
`;

const SubContentContainer = styled.div`
  display: flex;
  width: 830px;
  height: 157px;
  padding: 24px 0;
  background-color: ${designSystem.color.neutral.white04};
  border-radius: 8px;
  border: 1px solid ${designSystem.color.neutral.gray700};

  & > * {
    border-right: 1px solid ${designSystem.color.neutral.gray700};
  }

  & > *:last-child {
    border-right: none;
  }
`;

const TotalSubContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 8px;
  padding: 0 24px;
`;

const Title = styled.div`
  font: ${designSystem.font.title4.font};
  letter-spacing: ${designSystem.font.title4.letterSpacing};
  color: ${designSystem.color.neutral.gray400};
`;

const ValueWrapper = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

const Won = styled.div`
  font: ${designSystem.font.title2.font};
  letter-spacing: ${designSystem.font.title2.letterSpacing};
  color: ${designSystem.color.neutral.gray600};
`;

const Value = styled.div`
  font: ${designSystem.font.title1.font};
  letter-spacing: ${designSystem.font.title1.letterSpacing};
`;
