import { AsyncBoundary } from "@components/AsyncBoundary";
import TableSkeleton from "@components/Table/TableSkeleton";
import { PortfolioList } from "@features/portfolio/components/PortfolioList/PortfolioList";
import { PortfolioListTableErrorFallback } from "@features/portfolio/components/PortfolioList/errorFallback/PortfolioListTableErrorFallback";
import useResponsiveLayout from "@hooks/useResponsiveLayout";
import BasePage from "@pages/BasePage";
import styled from "styled-components";

export default function PortfolioListPage() {
  const { isMobile } = useResponsiveLayout();

  return (
    <BasePage>
      <StyledPortfolioList $isMobile={isMobile}>
        <AsyncBoundary
          ErrorFallback={PortfolioListTableErrorFallback}
          SuspenseFallback={<TableSkeleton />}>
          <PortfolioList />
        </AsyncBoundary>
      </StyledPortfolioList>
    </BasePage>
  );
}

const StyledPortfolioList = styled.div<{ $isMobile: boolean }>`
  width: 100%;
  max-width: 1440px;
  display: flex;
  flex-direction: column;
  margin-top: ${({ $isMobile }) => ($isMobile ? "0" : "48px")};
  padding: ${({ $isMobile }) => ($isMobile ? "0" : "32px")};
  background-color: ${({ theme: { color } }) => color.neutral.white};
  border-radius: 8px;
  flex: 1;
`;
