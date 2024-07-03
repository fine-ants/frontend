import emptyWatchlistImage from "@assets/images/empty_watchlist.svg";
import Button from "@components/Buttons/Button";
import { Icon } from "@components/Icon";
import { useBoolean } from "@fineants/demolition";
import useResponsiveLayout from "@hooks/useResponsiveLayout";
import designSystem from "@styles/designSystem";
import styled from "styled-components";
import NewWatchlistDialog from "../dialog/NewWatchlistDialog";

export default function EmptyWatchlistsTable() {
  const { isMobile } = useResponsiveLayout();

  const {
    state: isNewWatchlistDialogOpen,
    setTrue: onAddNewWatchlistButtonClick,
    setFalse: onNewWatchlistDialogClose,
  } = useBoolean();

  return (
    <StyledEmptyWatchlistsTable $isMobile={isMobile}>
      <img src={emptyWatchlistImage} alt="관심종목 비어있음" />

      <TextContainer $isMobile={isMobile}>
        <h1>관심 종목 리스트를 추가하세요</h1>
        <span>관심 종목 리스트를 추가하고 관심 종목을 담아보세요</span>
      </TextContainer>
      <Button
        variant="primary"
        size={isMobile ? "h40" : "h44"}
        onClick={onAddNewWatchlistButtonClick}>
        <Icon icon="folder-add" size={16} color="white" />
        <span>새 리스트 추가</span>
      </Button>

      {isNewWatchlistDialogOpen && (
        <NewWatchlistDialog
          isOpen={isNewWatchlistDialogOpen}
          onClose={onNewWatchlistDialogClose}
        />
      )}
    </StyledEmptyWatchlistsTable>
  );
}

const StyledEmptyWatchlistsTable = styled.div<{ $isMobile: boolean }>`
  width: ${({ $isMobile }) => ($isMobile ? "100%" : "600px")};
  height: 457px;
  margin: ${({ $isMobile }) => ($isMobile ? "auto" : "98px auto 0 auto")};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 48px;

  > img {
    height: ${({ $isMobile }) => ($isMobile ? "80px" : "auto")};
  }
`;

const TextContainer = styled.div<{ $isMobile: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ $isMobile }) => ($isMobile ? "24px" : "16px")};

  h1 {
    font: ${({ $isMobile }) =>
      $isMobile
        ? designSystem.font.title3.font
        : designSystem.font.heading3.font};
    letter-spacing: ${({ $isMobile }) =>
      $isMobile
        ? designSystem.font.title3.letterSpacing
        : designSystem.font.heading3.letterSpacing};
    color: ${designSystem.color.neutral.gray600};
  }

  span {
    font: ${({ $isMobile }) =>
      $isMobile ? designSystem.font.body3.font : designSystem.font.body2.font};
    color: ${designSystem.color.neutral.gray500};
  }
`;
