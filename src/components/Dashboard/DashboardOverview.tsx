import useDashboardOverviewQuery from "@api/dashboard/queries/useDashboardOverviewQuery";
import RateBadge from "@components/common/Badges/RateBadge";
import { thousandsDelimiter } from "@utils/delimiters";
import styled from "styled-components";

export default function DashboardOverview() {
  const { data: overviewData } = useDashboardOverviewQuery();

  return (
    <StyledDashboardOverview>
      <InnerWrapper>
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
                <Value>
                  {thousandsDelimiter(overviewData?.totalGain ?? 0)}
                </Value>
              </ValueWrapper>
              <RateBadge rate={overviewData?.totalGainRate ?? 0} />
            </TotalSubContentWrapper>
            <TotalSubContentWrapper>
              <Title>연 배당금</Title>
              <ValueWrapper>
                <Won>₩</Won>
                <Value>
                  {thousandsDelimiter(overviewData?.totalAnnualDividend ?? 0)}
                </Value>
              </ValueWrapper>
              <RateBadge
                rate={overviewData?.totalAnnualDividendYield ?? 0}
                iconStatus={false}
                isDividendRate={true}
              />
            </TotalSubContentWrapper>
          </SubContentContainer>
        </ContentContainer>
      </InnerWrapper>
    </StyledDashboardOverview>
  );
}

const StyledDashboardOverview = styled.div`
  width: 100%;
  height: 316px;
  padding: 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  position: relative;
  background-color: ${({ theme: { color } }) => color.neutral.gray800};
  color: ${({ theme: { color } }) => color.neutral.white};
`;

const InnerWrapper = styled.div`
  width: 100%;
  max-width: 1440px;
  height: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 24px;
`;

const PageTitle = styled.h1`
  width: 100%;
  display: flex;
  font: ${({ theme: { font } }) => font.heading2};
  letter-spacing: -0.02em;
`;

const TotalMainContentWrapper = styled.div`
  width: 586px;
  height: 157px;
  padding-top: 24px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
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
