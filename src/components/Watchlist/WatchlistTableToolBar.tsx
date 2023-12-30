import Button from "@components/common/Buttons/Button";
import { Icon } from "@components/common/Icon";
import { Toolbar } from "@mui/material";
import { useState } from "react";
import styled from "styled-components";
import WatchlistItemAddDialog from "./WatchlistItemAddDialog";

export default function WatchlistTableToolBar() {
  const [isAddWatchlistDialogOpen, setIsAddWatchlistDialogOpen] =
    useState(false);

  const onAddWatchlistItemButtonClick = () => {
    setIsAddWatchlistDialogOpen(true);
  };

  const onAddWatchlistItemDialogClose = () => {
    setIsAddWatchlistDialogOpen(false);
  };

  return (
    <StyledToolbar>
      <Button
        variant="primary"
        size="h32"
        onClick={onAddWatchlistItemButtonClick}>
        <Icon icon="add" size={12} color="white" />
        <span>관심 종목 추가</span>
      </Button>

      {isAddWatchlistDialogOpen && (
        <WatchlistItemAddDialog
          isOpen={isAddWatchlistDialogOpen}
          onClose={onAddWatchlistItemDialogClose}
        />
      )}
    </StyledToolbar>
  );
}

const StyledToolbar = styled(Toolbar)`
  height: 32px;
  min-height: 32px;
  padding: 0;
  margin-bottom: 16px;
  display: flex;
  justify-content: flex-end;
`;
