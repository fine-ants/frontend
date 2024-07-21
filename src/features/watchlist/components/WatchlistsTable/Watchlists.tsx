import { IconButton } from "@components/Buttons/IconButton";
import useWatchlistsQuery from "@features/watchlist/api/queries/useWatchlistsQuery";
import { useBoolean } from "@fineants/demolition";
import useResponsiveLayout from "@hooks/useResponsiveLayout";
import designSystem from "@styles/designSystem";
import styled from "styled-components";
import NewWatchlistDialog from "../dialog/NewWatchlistDialog";
import WatchlistsTable from "./desktop/WatchlistsTable";
import WatchlistsCardTable from "./mobile/WatchlistsCardTable";

export default function Watchlists() {
  const { isDesktop, isMobile } = useResponsiveLayout();

  const {
    state: isNewWatchlistDialogOpen,
    setTrue: onNewWatchlistDialogOpen,
    setFalse: onNewWatchlistDialogClose,
  } = useBoolean();

  const { data } = useWatchlistsQuery();

  const isEmpty = data.length === 0;

  return (
    <StyledWatchlists $isMobile={isMobile}>
      <Header $isMobile={isMobile}>
        <h1>전체 관심 종목 리스트</h1>
        {isMobile && !isEmpty && (
          <IconButton
            icon="folder-add"
            size="h40"
            iconColor="custom"
            customColor={{ color: "white", hoverColor: "blue400" }}
            bgColor="blue500"
            onClick={onNewWatchlistDialogOpen}
          />
        )}
      </Header>

      {isDesktop && <WatchlistsTable data={data} />}
      {isMobile && <WatchlistsCardTable data={data} />}

      {isNewWatchlistDialogOpen && (
        <NewWatchlistDialog
          isOpen={isNewWatchlistDialogOpen}
          onClose={onNewWatchlistDialogClose}
        />
      )}
    </StyledWatchlists>
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

const Header = styled.header<{ $isMobile: boolean }>`
  width: 100%;
  margin-bottom: 36px;
  padding: ${({ $isMobile }) => ($isMobile ? "0 16px" : "0")};
  display: flex;
  justify-content: space-between;

  h1 {
    font: ${({ $isMobile }) =>
      $isMobile
        ? designSystem.font.heading3.font
        : designSystem.font.heading2.font};
    letter-spacing: ${({ $isMobile }) =>
      $isMobile
        ? designSystem.font.heading3.letterSpacing
        : designSystem.font.heading2.letterSpacing};
    color: ${designSystem.color.neutral.gray900};
  }
`;
