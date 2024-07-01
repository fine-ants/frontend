import emptyWatchlistImage from "@assets/images/empty_watchlistItem.svg";
import Button from "@components/Buttons/Button";
import { Icon } from "@components/Icon";
import { useBoolean } from "@fineants/demolition";
import useResponsiveLayout from "@hooks/useResponsiveLayout";
import designSystem from "@styles/designSystem";
import styled from "styled-components";
import WatchlistItemAddDialog from "../dialog/WatchlistItemAddDialog";

export default function EmptyWatchlistTable() {
  const { isMobile } = useResponsiveLayout();

  const {
    state: isAddWatchlistDialogOpen,
    setTrue: onAddWatchlistButtonClick,
    setFalse: onAddWatchlistDialogClose,
  } = useBoolean();

  return (
    <StyledEmptyWatchlistsTable $isMobile={isMobile}>
      <Content>
        <img src={emptyWatchlistImage} alt="관심종목 비어있음" />

        <TextContainer $isMobile={isMobile}>
          <h1>관심 종목을 추가하세요</h1>
          <span>관심 있는 종목을 추가하면 여기에서 모아볼 수 있습니다</span>
        </TextContainer>
        <Button
          variant="primary"
          size="h32"
          onClick={onAddWatchlistButtonClick}>
          <Icon icon="favorite" size={16} color="white" />
          <span>관심 종목 추가</span>
        </Button>

        {isAddWatchlistDialogOpen && (
          <WatchlistItemAddDialog
            isOpen={isAddWatchlistDialogOpen}
            onClose={onAddWatchlistDialogClose}
          />
        )}
      </Content>
    </StyledEmptyWatchlistsTable>
  );
}

const StyledEmptyWatchlistsTable = styled.div<{ $isMobile: boolean }>`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  width: ${({ $isMobile }) => ($isMobile ? "100%" : "1376px")};
  height: ${({ $isMobile }) => ($isMobile ? "auto" : "635px")};
  border-radius: 8px;
  border: 1px dashed ${designSystem.color.primary.blue100};
  border: ${({ $isMobile }) =>
    $isMobile ? "none" : `1px dashed ${designSystem.color.primary.blue100}`};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-content: center;
  gap: 24px;
`;

const TextContainer = styled.div<{ $isMobile: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

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
