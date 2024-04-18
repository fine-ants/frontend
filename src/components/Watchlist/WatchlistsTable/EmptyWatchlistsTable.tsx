import emptyWatchlistImage from "@assets/images/empty_watchlist.svg";
import Button from "@components/common/Buttons/Button";
import { Icon } from "@components/common/Icon";
import designSystem from "@styles/designSystem";
import { useState } from "react";
import styled from "styled-components";
import NewWatchlistDialog from "../NewWatchlistDialog";
export default function EmptyWatchlistsTable() {
  const [isNewWatchlistDialogOpen, setIsNewWatchlistDialogOpen] =
    useState(false);

  const onAddNewWatchlistButtonClick = () => {
    setIsNewWatchlistDialogOpen(true);
  };

  const onNewWatchlistDialogClose = () => {
    setIsNewWatchlistDialogOpen(false);
  };

  return (
    <StyledEmptyWatchlistsTable>
      <img src={emptyWatchlistImage} alt="관심종목 비어있음" />

      <TextContainer>
        <h1>관심 종목 리스트를 추가하세요</h1>
        <span>관심 종목 리스트를 추가하고 관심 종목을 담아보세요</span>
      </TextContainer>
      <Button
        variant="primary"
        size="h44"
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

const StyledEmptyWatchlistsTable = styled.div`
  width: 600px;
  height: 457px;
  margin: 98px auto 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 48px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  h1 {
    font: ${designSystem.font.heading3.font};
    letter-spacing: ${designSystem.font.heading3.letterSpacing};
    color: ${designSystem.color.neutral.gray600};
  }

  span {
    font: ${designSystem.font.body2.font};
    color: ${designSystem.color.neutral.gray500};
  }
`;
