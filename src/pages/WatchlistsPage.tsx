import { AsyncBoundary } from "@components/AsyncBoundary";
import TableSkeleton from "@components/Table/TableSkeleton";
import Watchlists from "@features/watchlist/components/WatchlistsTable/Watchlists";
import WatchlistTableErrorFallback from "@features/watchlist/components/errorFallback/WatchlistTableErrorFallback";
import useResponsiveLayout from "@hooks/useResponsiveLayout";
import designSystem from "@styles/designSystem";
import styled from "styled-components";
import BasePage from "./BasePage";

export default function WatchlistsPage() {
  const { isMobile } = useResponsiveLayout();

  return (
    <BasePage>
      <StyledWatchlists $isMobile={isMobile}>
        <AsyncBoundary
          ErrorFallback={WatchlistTableErrorFallback}
          SuspenseFallback={<TableSkeleton />}>
          <Watchlists />
        </AsyncBoundary>
      </StyledWatchlists>
    </BasePage>
  );
}

const StyledWatchlists = styled.div<{ $isMobile: boolean }>`
  width: 100%;
  max-width: 1440px;
  margin-top: ${({ $isMobile }) => ($isMobile ? "0" : "48px")};
  padding: ${({ $isMobile }) => ($isMobile ? "32px 0" : "32px")};
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: ${designSystem.color.neutral.white};
  border-radius: 8px;
`;
