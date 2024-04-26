import Button from "@components/Buttons/Button";
import ConfirmAlert from "@components/ConfirmAlert";
import { Icon } from "@components/Icon";
import { WatchlistsType } from "@features/watchlist/api";
import useWatchlistsDeleteMutation from "@features/watchlist/api/queries/useWatchlistsDeleteMutation";
import { Toolbar, Typography } from "@mui/material";
import designSystem from "@styles/designSystem";
import { useState } from "react";
import styled from "styled-components";
import NewWatchlistDialog from "../NewWatchlistDialog";

interface Props {
  selected: readonly WatchlistsType[];
  updateSelected: (newSelected: readonly WatchlistsType[]) => void;
}

export default function WatchlistsTableToolBar({
  selected,
  updateSelected,
}: Props) {
  const { mutateAsync: watchlistsDeleteMutateAsync } =
    useWatchlistsDeleteMutation();

  const [isNewWatchlistDialogOpen, setIsNewWatchlistDialogOpen] =
    useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const onAddNewWatchlistButtonClick = () => {
    setIsNewWatchlistDialogOpen(true);
  };

  const onNewWatchlistDialogClose = () => {
    setIsNewWatchlistDialogOpen(false);
  };

  const onDeleteWatchlistsButtonClick = () => {
    setIsConfirmOpen(true);
  };

  const onDeleteWatchlistsAlertClose = () => {
    setIsConfirmOpen(false);
  };

  const onConfirmAction = async () => {
    const selectedWatchlistIds = selected.map((item) => item.id);
    await watchlistsDeleteMutateAsync(selectedWatchlistIds);
    updateSelected([]);
  };

  return (
    <StyledToolbar>
      <SelectedInfoContainer>
        {selected.length > 0 && (
          <>
            <Typography
              sx={{ font: designSystem.font.body3.font }}
              color="inherit"
              variant="subtitle1"
              component="span">
              <span>{selected.length}</span>
              <span style={{ color: designSystem.color.neutral.gray600 }}>
                개 선택됨
              </span>
            </Typography>

            <Icon icon="divider" size={12} color="gray100" />

            <Button
              variant="tertiary"
              size="h32"
              onClick={onDeleteWatchlistsButtonClick}>
              <Icon icon="trash" size={16} color="gray600" />
              <span>삭제</span>
            </Button>
          </>
        )}
      </SelectedInfoContainer>

      <Button
        variant="primary"
        size="h32"
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

      {isConfirmOpen && (
        <ConfirmAlert
          isOpen={isConfirmOpen}
          title="관심 종목 리스트 삭제"
          onClose={onDeleteWatchlistsAlertClose}
          onConfirm={onConfirmAction}>
          <span>
            '
            {`${selected[0].name}'${
              selected.length > 1 ? ` 외 ${selected.length - 1}개` : ""
            } 관심 종목 리스트를 삭제하시겠습니까?`}
          </span>
        </ConfirmAlert>
      )}
    </StyledToolbar>
  );
}

const StyledToolbar = styled(Toolbar)`
  height: 32px;
  min-height: 32px;
  margin-bottom: 16px;
  padding: 0;
  display: flex;
  justify-content: space-between;
`;

const SelectedInfoContainer = styled.div`
  width: auto;
  display: flex;
  align-items: center;
  gap: 8px;
`;
