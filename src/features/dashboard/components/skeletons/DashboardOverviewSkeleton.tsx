import { Skeleton } from "@mui/material";
import designSystem from "@styles/designSystem";
import styled from "styled-components";

export function DashboardOverviewSkeleton() {
  return (
    <StyledDashboardOverviewSkeleton>
      <InnerWrapper>
        <StyledSkeleton variant="rounded" width="100%" height={39} />
        <ContentContainer>
          <TotalMainContentWrapper>
            <StyledSkeleton variant="rounded" width={76} height={19} />
            <StyledSkeleton variant="rounded" width="100%" height={58} />
          </TotalMainContentWrapper>
          <SubContentContainer>
            <TotalSubContentWrapper>
              <StyledSkeleton variant="rounded" width={76} height={19} />
              <StyledSkeleton variant="rounded" width="100%" height={34} />
            </TotalSubContentWrapper>
            <TotalSubContentWrapper>
              <StyledSkeleton variant="rounded" width={76} height={19} />
              <StyledSkeleton variant="rounded" width="100%" height={34} />
              <StyledSkeleton variant="rounded" width={61} height={24} />
            </TotalSubContentWrapper>
            <TotalSubContentWrapper>
              <StyledSkeleton variant="rounded" width={76} height={19} />
              <StyledSkeleton variant="rounded" width="100%" height={34} />
              <StyledSkeleton variant="rounded" width={61} height={24} />
            </TotalSubContentWrapper>
          </SubContentContainer>
        </ContentContainer>
      </InnerWrapper>
    </StyledDashboardOverviewSkeleton>
  );
}

const StyledDashboardOverviewSkeleton = styled.div`
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

const TotalMainContentWrapper = styled.div`
  width: 586px;
  height: 157px;
  padding-top: 24px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 8px;
  color: ${({ theme: { color } }) => color.neutral.white};
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

const StyledSkeleton = styled(Skeleton)`
  background-color: ${designSystem.color.neutral.gray700};
`;
