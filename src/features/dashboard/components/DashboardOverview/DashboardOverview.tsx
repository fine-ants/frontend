import useDashboardOverviewQuery from "@features/dashboard/api/queries/useDashboardOverviewQuery";
import useResponsiveLayout from "@hooks/useResponsiveLayout";
import designSystem from "@styles/designSystem";
import styled from "styled-components";
import DashboardOverviewContentD from "./DashboardOverviewContentD";
import DashboardOverviewContentM from "./DashboardOverviewContentM";

export default function DashboardOverview() {
  const { data: overviewData } = useDashboardOverviewQuery();
  const { isDesktop, isMobile } = useResponsiveLayout();

  return (
    <StyledDashboardOverview $isDesktop={isDesktop}>
      {isDesktop && <DashboardOverviewContentD overviewData={overviewData} />}
      {isMobile && <DashboardOverviewContentM overviewData={overviewData} />}
    </StyledDashboardOverview>
  );
}

const StyledDashboardOverview = styled.div<{ $isDesktop: boolean }>`
  width: 100%;
  // height: 316px;
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

// const InnerWrapper = styled.div`
//   width: 100%;
//   max-width: 1440px;
//   height: inherit;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   gap: 24px;
// `;

// const ContentContainer = styled.div`
//   width: 100%;
//   display: flex;
//   justify-content: space-between;
//   gap: 24px;
// `;

// const PageTitle = styled.h1`
//   width: 100%;
//   display: flex;
//   font: ${designSystem.font.heading2.font};
//   letter-spacing: ${designSystem.font.heading2.letterSpacing};
// `;

// const TotalMainContentWrapper = styled.div`
//   width: 586px;
//   height: 157px;
//   padding-top: 24px;
//   display: flex;
//   flex-direction: column;
//   justify-content: flex-start;
//   align-items: center;
//   gap: 8px;
//   color: ${designSystem.color.neutral.white};
// `;

// const MainTitle = styled.div`
//   margin-right: auto;

//   font: ${designSystem.font.title4.font};
//   letter-spacing: ${designSystem.font.title4.letterSpacing};
//   color: ${designSystem.color.neutral.gray400};
// `;

// const MainWon = styled.div`
//   font: ${designSystem.font.heading2.font};
//   letter-spacing: ${designSystem.font.heading2.letterSpacing};
//   color: ${designSystem.color.neutral.gray600};
// `;

// const MainValueWrapper = styled.div`
//   margin-right: auto;
//   display: flex;
//   gap: 4px;
//   align-items: center;
// `;

// const MainValue = styled.div`
//   font: ${designSystem.font.heading1.font};
//   letter-spacing: ${designSystem.font.heading1.letterSpacing};
// `;

// const SubContentContainer = styled.div`
//   display: flex;
//   width: 830px;
//   height: 157px;
//   padding: 24px 0;
//   background-color: ${designSystem.color.neutral.white04};
//   border-radius: 8px;
//   border: 1px solid ${designSystem.color.neutral.gray700};

//   & > * {
//     border-right: 1px solid ${designSystem.color.neutral.gray700};
//   }

//   & > *:last-child {
//     border-right: none;
//   }
// `;

// const TotalSubContentWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   flex: 1;
//   gap: 8px;
//   padding: 0 24px;
// `;

// const Title = styled.div`
//   font: ${designSystem.font.title4.font};
//   letter-spacing: ${designSystem.font.title4.letterSpacing};
//   color: ${designSystem.color.neutral.gray400};
// `;

// const ValueWrapper = styled.div`
//   display: flex;
//   gap: 4px;
//   align-items: center;
// `;

// const Won = styled.div`
//   font: ${designSystem.font.title2.font};
//   letter-spacing: ${designSystem.font.title2.letterSpacing};
//   color: ${designSystem.color.neutral.gray600};
// `;

// const Value = styled.div`
//   font: ${designSystem.font.title1.font};
//   letter-spacing: ${designSystem.font.title1.letterSpacing};
// `;
