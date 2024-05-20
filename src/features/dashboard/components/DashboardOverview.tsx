import RateBadge from "@components/Badges/RateBadge";
import useDashboardOverviewQuery from "@features/dashboard/api/queries/useDashboardOverviewQuery";
import { thousandsDelimiter } from "@fineants/demolition";
import useResponsiveLayout from "@hooks/useResponsiveLayout";
import designSystem from "@styles/designSystem";
import styled from "styled-components";

export default function DashboardOverview() {
  const { data: overviewData } = useDashboardOverviewQuery();
  const {
    username,
    totalValuation,
    totalInvestment,
    totalGain,
    totalGainRate,
    totalAnnualDividend,
    totalAnnualDividendYield,
  } = overviewData;

  const { isDesktop, isMobile } = useResponsiveLayout();

  return (
    <StyledDashboardOverview $isDesktop={isDesktop}>
      <InnerWrapper>
        <PageTitle $isMobile={isMobile}>{username} 님의 대시보드</PageTitle>

        <ContentContainer $isMobile={isMobile}>
          <TotalMainContentWrapper $isMobile={isMobile}>
            <MainTitle $isMobile={isMobile}>총 평가 금액</MainTitle>
            <MainValueWrapper>
              <MainWon $isMobile={isMobile}>₩</MainWon>
              <MainValue $isMobile={isMobile}>
                {thousandsDelimiter(totalValuation)}
              </MainValue>
            </MainValueWrapper>
          </TotalMainContentWrapper>

          <SubContentContainer $isMobile={isMobile}>
            <TotalSubContentWrapper $isMobile={isMobile}>
              <Title $isMobile={isMobile}>총 투자 금액</Title>
              <ValueWrapper>
                <Won $isMobile={isMobile}>₩</Won>
                <Value $isMobile={isMobile}>
                  {thousandsDelimiter(totalInvestment)}
                </Value>
              </ValueWrapper>
            </TotalSubContentWrapper>
            <TotalSubContentWrapper $isMobile={isMobile}>
              <Title $isMobile={isMobile}>총 손익</Title>
              <SubContent $isMobile={isMobile}>
                <ValueWrapper>
                  <Won $isMobile={isMobile}>₩</Won>
                  <Value $isMobile={isMobile}>
                    {thousandsDelimiter(totalGain)}
                  </Value>
                </ValueWrapper>
                {totalGainRate > 0 && (
                  <RateBadge size={24} value={totalGainRate} />
                )}
              </SubContent>
            </TotalSubContentWrapper>
            <TotalSubContentWrapper $isMobile={isMobile}>
              <Title $isMobile={isMobile}>예상 연 배당금</Title>
              <SubContent $isMobile={isMobile}>
                <ValueWrapper>
                  <Won $isMobile={isMobile}>₩</Won>
                  <Value $isMobile={isMobile}>
                    {thousandsDelimiter(totalAnnualDividend)}
                  </Value>
                </ValueWrapper>
                {totalAnnualDividendYield > 0 && (
                  <RateBadge
                    size={24}
                    value={totalAnnualDividendYield}
                    iconStatus={false}
                  />
                )}
              </SubContent>
            </TotalSubContentWrapper>
          </SubContentContainer>
        </ContentContainer>
      </InnerWrapper>
    </StyledDashboardOverview>
  );
}

const StyledDashboardOverview = styled.div<{ $isDesktop: boolean }>`
  width: 100%;
  padding: ${({ $isDesktop }) => ($isDesktop ? "48px 0" : "32px 16px")};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  position: relative;
  background-color: ${designSystem.color.neutral.gray800};
  color: ${designSystem.color.neutral.white};
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

const ContentContainer = styled.div<{ $isMobile: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: ${({ $isMobile }) => ($isMobile ? "column" : "row")};
  justify-content: space-between;
  gap: ${({ $isMobile }) => ($isMobile ? "16px" : "24px")};
`;

const PageTitle = styled.h1<{ $isMobile: boolean }>`
  width: 100%;
  display: flex;
  font: ${({ $isMobile }) =>
    $isMobile
      ? designSystem.font.heading4.font
      : designSystem.font.heading2.font};

  letter-spacing: ${({ $isMobile }) =>
    $isMobile
      ? designSystem.font.heading4.letterSpacing
      : designSystem.font.heading2.letterSpacing};
`;

const TotalMainContentWrapper = styled.div<{ $isMobile: boolean }>`
  width: 586px;
  height: ${({ $isMobile }) => ($isMobile ? "auto" : "157px")};
  padding-top: ${({ $isMobile }) => ($isMobile ? "0px" : "24px")};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  color: ${designSystem.color.neutral.white};
`;

const MainTitle = styled.div<{ $isMobile: boolean }>`
  margin-right: auto;
  font: ${({ $isMobile }) =>
    $isMobile ? designSystem.font.title5.font : designSystem.font.title4.font};
  letter-spacing: ${({ $isMobile }) =>
    $isMobile
      ? designSystem.font.title5.letterSpacing
      : designSystem.font.title4.letterSpacing};
  color: ${designSystem.color.neutral.gray400};
`;

const MainWon = styled.div<{ $isMobile: boolean }>`
  font: ${({ $isMobile }) =>
    $isMobile
      ? designSystem.font.title2.font
      : designSystem.font.display3.font};
  letter-spacing: ${({ $isMobile }) =>
    $isMobile
      ? designSystem.font.title2.letterSpacing
      : designSystem.font.display3.letterSpacing};
  color: ${designSystem.color.neutral.gray600};
`;

const MainValueWrapper = styled.div`
  margin-right: auto;
  display: flex;
  gap: 4px;
  align-items: center;
`;

const MainValue = styled.div<{ $isMobile: boolean }>`
  font: ${({ $isMobile }) =>
    $isMobile
      ? designSystem.font.display3.font
      : designSystem.font.heading1.font};
  letter-spacing: ${({ $isMobile }) =>
    $isMobile
      ? designSystem.font.display3.letterSpacing
      : designSystem.font.heading1.letterSpacing};
`;

const SubContentContainer = styled.div<{ $isMobile: boolean }>`
  display: flex;
  flex-direction: ${({ $isMobile }) => ($isMobile ? "column" : "row")};
  width: ${({ $isMobile }) => ($isMobile ? "100%" : "830px")};
  height: ${({ $isMobile }) => ($isMobile ? "auto" : "157px")};
  padding: ${({ $isMobile }) => ($isMobile ? "8px 24px" : "24px 0")};
  background-color: ${designSystem.color.neutral.white04};
  border-radius: 8px;
  border: 1px solid ${designSystem.color.neutral.gray700};

  & > div {
    ${({ $isMobile }) =>
      $isMobile
        ? `border-bottom: 1px solid ${designSystem.color.neutral.gray700}`
        : `border-right: 1px solid ${designSystem.color.neutral.gray700}`}
  }

  & > div:last-child {
    border-right: none;
    border-bottom: none;
  }
`;

const TotalSubContentWrapper = styled.div<{ $isMobile: boolean }>`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 8px;
  padding: ${({ $isMobile }) => ($isMobile ? "16px 0 " : "0 24px")};
`;

const Title = styled.div<{ $isMobile: boolean }>`
  font: ${({ $isMobile }) =>
    $isMobile ? designSystem.font.title5.font : designSystem.font.title4.font};
  letter-spacing: ${({ $isMobile }) =>
    $isMobile
      ? designSystem.font.title5.letterSpacing
      : designSystem.font.title4.letterSpacing};
  color: ${designSystem.color.neutral.gray400};
`;

const ValueWrapper = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

const SubContent = styled.div<{ $isMobile: boolean }>`
  height: 100%;
  display: flex;
  flex-direction: ${({ $isMobile }) => ($isMobile ? "row" : "column")};
  justify-content: space-between;
`;

const Won = styled.div<{ $isMobile: boolean }>`
  font: ${({ $isMobile }) =>
    $isMobile ? designSystem.font.title3.font : designSystem.font.title2.font};
  letter-spacing: ${({ $isMobile }) =>
    $isMobile
      ? designSystem.font.title3.letterSpacing
      : designSystem.font.title2.letterSpacing};
  color: ${designSystem.color.neutral.gray600};
`;

const Value = styled.div<{ $isMobile: boolean }>`
  font: ${({ $isMobile }) =>
    $isMobile ? designSystem.font.title2.font : designSystem.font.title1.font};
  letter-spacing: ${({ $isMobile }) =>
    $isMobile
      ? designSystem.font.title2.letterSpacing
      : designSystem.font.title1.letterSpacing};
`;
