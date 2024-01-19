import emptyWatchlistImage from "@assets/images/empty_watchlist.svg";
import Button from "@components/common/Buttons/Button";
import { Icon } from "@components/common/Icon";
import designSystem from "@styles/designSystem";
import { useState } from "react";
import styled from "styled-components";
import WatchlistAddDialog from "../WatchlistAddDialog";
export default function EmptyWatchlistsTable() {
  const [isAddWatchlistDialogOpen, setIsAddWatchlistDialogOpen] =
    useState(false);
  const onAddWatchlistButtonClick = () => {
    setIsAddWatchlistDialogOpen(true);
  };

  const onAddWatchlistDialogClose = () => {
    setIsAddWatchlistDialogOpen(false);
  };

  return (
    <StyledEmptyWatchlistsTable>
      <img src={emptyWatchlistImage} alt="관심종목 비어있음" />

      <TextContainer>
        <h1>관심 종목 리스트를 추가하세요</h1>
        <span>관심 종목 리스트를 추가하고 관심 종목을 담아보세요</span>
      </TextContainer>
      <Button
        style={{ gap: "8px" }}
        variant="primary"
        size="h32"
        onClick={onAddWatchlistButtonClick}>
        <Icon icon="folder-add" size={16} color="white" />
        <span>새 리스트 추가</span>
      </Button>

      {isAddWatchlistDialogOpen && (
        <WatchlistAddDialog
          isOpen={isAddWatchlistDialogOpen}
          onClose={onAddWatchlistDialogClose}
        />
      )}
    </StyledEmptyWatchlistsTable>
  );
}

const StyledEmptyWatchlistsTable = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  margin-top: 98px;
  width: 600px;
  height: 457px;
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
