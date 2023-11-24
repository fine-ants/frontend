import useDashboardOverviewQuery from "@api/dashboard/queries/useDashboardOverviewQuery";
import { thousandsDelimiter } from "@utils/thousandsDelimiter";
import styled from "styled-components";

export default function DashboardOverview() {
  const { data: overviewData } = useDashboardOverviewQuery();

  return (
    <StyledDashboardOverview>
      <PageTitle>{overviewData?.username} 님의 대시보드</PageTitle>
      <ContentContainer>
        <TotalMainContentWrapper>
          <MainTitle>총 평가 금액</MainTitle>
          <MainValueWrapper>
            <MainWon>₩</MainWon>
            <MainValue>
              {thousandsDelimiter(overviewData?.totalValuation ?? 0)}
            </MainValue>
          </MainValueWrapper>
        </TotalMainContentWrapper>
        <SubContentContainer>
          <TotalSubContentWrapper>
            <Title>총 투자 금액</Title>
            <ValueWrapper>
              <Won>₩</Won>
              <Value>
                {thousandsDelimiter(overviewData?.totalInvestment ?? 0)}
              </Value>
            </ValueWrapper>
          </TotalSubContentWrapper>
          <TotalSubContentWrapper>
            <Title>총 손익</Title>
            <ValueWrapper>
              <Won>₩</Won>
              <Value>{thousandsDelimiter(overviewData?.totalGain ?? 0)}</Value>
            </ValueWrapper>
            <TotalValueRate>↑{overviewData?.totalGainRate}%</TotalValueRate>
          </TotalSubContentWrapper>
          <TotalSubContentWrapper>
            <Title>연 배당금</Title>
            <ValueWrapper>
              <Won>₩</Won>
              <Value>
                {thousandsDelimiter(overviewData?.totalAnnualDividend ?? 0)}
              </Value>
            </ValueWrapper>
            <DividendsRate>
              {overviewData?.totalAnnualDividendYield}%
            </DividendsRate>
          </TotalSubContentWrapper>
        </SubContentContainer>
      </ContentContainer>
    </StyledDashboardOverview>
  );
}

const StyledDashboardOverview = styled.div`
  width: 100%;
  height: 316px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  gap: 24px;
  padding: 48px 240px;
  z-index: 1;
  background-color: ${({ theme: { color } }) => color.neutral.gray800};

  color: ${({ theme: { color } }) => color.neutral.white};
`;

const ContentContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const PageTitle = styled.h1`
  display: flex;
  left: 0;
  position: relative;
  width: 100%;
  max-width: 1440px;
  font: ${({ theme: { font } }) => font.heading2};
  letter-spacing: -0.02em;
`;

const TotalMainContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: "flex-start";
  align-items: center;
  width: 586px;
  height: 157px;
  gap: 8px;
  padding-top: 24px;

  color: ${({ theme: { color } }) => color.neutral.white};
`;

const MainTitle = styled.div`
  margin-right: auto;

  font: ${({ theme: { font } }) => font.title3};
  letter-spacing: -0.02em;
  color: ${({ theme: { color } }) => color.neutral.gray400};
`;

const MainWon = styled.div`
  font: ${({ theme: { font } }) => font.heading2};
  letter-spacing: -0.02em;
  color: ${({ theme: { color } }) => color.neutral.gray600};
`;

const MainValueWrapper = styled.div`
  margin-right: auto;
  display: flex;
  gap: 4px;
  align-items: center;
`;

const MainValue = styled.div`
  font: ${({ theme: { font } }) => font.heading1};
  letter-spacing: -0.02em;
`;

const Title = styled.div`
  font: ${({ theme: { font } }) => font.title4};
  letter-spacing: -0.02em;
  color: ${({ theme: { color } }) => color.neutral.gray400};
`;

const ValueWrapper = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

const Won = styled.div`
  font: ${({ theme: { font } }) => font.title2};
  letter-spacing: -0.02em;
  color: ${({ theme: { color } }) => color.neutral.gray600};
`;
const Value = styled.div`
  font: ${({ theme: { font } }) => font.title1};
  letter-spacing: -0.02em;
  line-height: 34px;
`;

const ValueRate = styled.div`
  display: flex;
  align-items: center;

  height: 24px;
  border-radius: 4px;
  padding: 4px 8px;
  max-width: fit-content;
  margin-top: auto;

  font: ${({ theme: { font } }) => font.title5};
  letter-spacing: -0.02em;
`;

const TotalValueRate = styled(ValueRate)`
  color: ${({ theme: { color } }) => color.state.green};
  background-color: ${({ theme: { color } }) => color.state.green20};
`;

const DividendsRate = styled(ValueRate)`
  color: ${({ theme: { color } }) => color.state.green};
  background-color: ${({ theme: { color } }) => color.state.green20};
`;

const SubContentContainer = styled.div`
  display: flex;
  width: 830px;
  height: 157px;
  padding: 24px 0;
  background-color: ${({ theme: { color } }) => color.neutral.white04};
  border-radius: 8px;
  border: 1px solid ${({ theme: { color } }) => color.neutral.gray700};

  & > * {
    border-right: 1px solid ${({ theme: { color } }) => color.neutral.gray700};
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
