import Button from "@components/Buttons/Button";
import { Icon } from "@components/Icon";
import { WatchlistsType } from "@features/watchlist/api";
import useWatchlistsDeleteMutation from "@features/watchlist/api/queries/useWatchlistsDeleteMutation";
import { useBoolean } from "@fineants/demolition";
import { Toolbar, Typography } from "@mui/material";
import designSystem from "@styles/designSystem";
import styled from "styled-components";
import NewWatchlistDialog from "../../dialog/NewWatchlistDialog";
import WatchlistsDeleteConfirm from "../WatchlistsDeleteConfirm";

interface Props {
  selected: readonly WatchlistsType[];
  updateSelected: (newSelected: readonly WatchlistsType[]) => void;
  isAllDeleteOnLastPage: boolean;
  moveToPrevTablePage: () => void;
}

export default function WatchlistsTableToolBar({
  selected,
  updateSelected,
  isAllDeleteOnLastPage,
  moveToPrevTablePage,
}: Props) {
  const { mutateAsync: watchlistsDeleteMutateAsync } =
    useWatchlistsDeleteMutation();

  const {
    state: isNewWatchlistDialogOpen,
    setTrue: onAddNewWatchlistButtonClick,
    setFalse: onNewWatchlistDialogClose,
  } = useBoolean();
  const {
    state: isConfirmOpen,
    setTrue: onDeleteWatchlistsButtonClick,
    setFalse: onDeleteWatchlistsAlertClose,
  } = useBoolean();

  const onConfirmAction = async () => {
    const selectedWatchlistIds = selected.map((item) => item.id);
    await watchlistsDeleteMutateAsync(selectedWatchlistIds);

    updateSelected([]);

    if (isAllDeleteOnLastPage) {
      moveToPrevTablePage();
    }
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
        <WatchlistsDeleteConfirm
          isOpen={isConfirmOpen}
          onClose={onDeleteWatchlistsAlertClose}
          onConfirm={onConfirmAction}
          selected={selected}
        />
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
