import { Box, Skeleton } from "@mui/material";
import styled from "styled-components";

export default function MainPanelSkeleton() {
  return (
    <StyledMainPanelSkeleton>
      <PortfolioOverviewContainer>
        <StyledPortfolioOverview>
          <TitleContainer>
            <StyledSkeleton variant="rounded" width={92} height={17} />
            <StyledSkeleton variant="rounded" width={896} height={40} />
          </TitleContainer>
          <StyledSkeleton variant="rounded" width={"100%"} height={64} />
          <StyledSkeleton variant="rounded" width={"100%"} height={283} />
        </StyledPortfolioOverview>
      </PortfolioOverviewContainer>

      <PortfolioHoldingsContainer>
        <StyledSkeleton variant="rounded" width={"100%"} height={32} />
        <StyledSkeleton variant="rounded" width={"100%"} height={338} />
      </PortfolioHoldingsContainer>
    </StyledMainPanelSkeleton>
  );
}

const StyledMainPanelSkeleton = styled.div`
  width: 960px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 32px;
  background-color: #ffffff;
  border-radius: 8px;
`;

const PortfolioOverviewContainer = styled.div`
  width: 100%;
`;

const PortfolioHoldingsContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 896px;
`;

const StyledPortfolioOverview = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

const TitleContainer = styled.div`
  height: 73px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StyledSkeleton = styled(Skeleton)`
  background-color: ${({ theme: { color } }) => color.neutral.gray100};
`;
