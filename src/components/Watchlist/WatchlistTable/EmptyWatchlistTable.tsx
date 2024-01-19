import emptyWatchlistImage from "@assets/images/empty_watchlistItem.svg";
import Button from "@components/common/Buttons/Button";
import { Icon } from "@components/common/Icon";
import designSystem from "@styles/designSystem";
import { useState } from "react";
import styled from "styled-components";
import WatchlistItemAddDialog from "../WatchlistItemAddDialog";

export default function EmptyWatchlistTable() {
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
      <Content>
        <img src={emptyWatchlistImage} alt="관심종목 비어있음" />

        <TextContainer>
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

const StyledEmptyWatchlistsTable = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1376px;
  height: 635px;
  border-radius: 8px;
  border: 1px dashed ${designSystem.color.primary.blue100};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
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
