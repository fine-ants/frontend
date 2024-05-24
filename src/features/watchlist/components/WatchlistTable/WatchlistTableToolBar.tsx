import Button from "@components/Buttons/Button";
import ConfirmAlert from "@components/ConfirmAlert";
import { Icon } from "@components/Icon";
import { WatchlistItemType } from "@features/watchlist/api";
import useWatchlistItemDeleteMutation from "@features/watchlist/api/queries/useWatchlistItemDeleteMutation";
import { useBoolean } from "@fineants/demolition";
import { Toolbar, Tooltip, Typography } from "@mui/material";
import designSystem from "@styles/designSystem";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import WatchlistItemAddDialog from "../WatchlistItemAddDialog";

interface Props {
  selected: readonly WatchlistItemType[];
  updateSelected: (newSelected: readonly WatchlistItemType[]) => void;
}

export default function WatchlistTableToolBar({
  selected,
  updateSelected,
}: Props) {
  const { watchlistId } = useParams();

  const { mutateAsync: watchlistItemDeleteMutateAsync } =
    useWatchlistItemDeleteMutation(Number(watchlistId));

  const {
    state: isAddWatchlistDialogOpen,
    setTrue: onAddWatchlistItemButtonClick,
    setFalse: onAddWatchlistItemDialogClose,
  } = useBoolean();
  const {
    state: isConfirmOpen,
    setTrue: onDeleteWatchlistItemButtonClick,
    setFalse: onDeleteWatchlistItemAlertClose,
  } = useBoolean();

  const onConfirmAction = async () => {
    const tickerSymbols = selected.map((item) => item.tickerSymbol);
    await watchlistItemDeleteMutateAsync(tickerSymbols);
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

            <Tooltip title="선택된 종목 삭제">
              <Button
                variant="tertiary"
                size="h32"
                onClick={onDeleteWatchlistItemButtonClick}>
                <Icon icon="trash" size={16} color="gray600" />
                <span>삭제</span>
              </Button>
            </Tooltip>
          </>
        )}
      </SelectedInfoContainer>

      <Button
        variant="primary"
        size="h32"
        onClick={onAddWatchlistItemButtonClick}>
        <Icon icon="favorite-add" size={16} color="white" />
        <span>관심 종목 추가</span>
      </Button>

      {isAddWatchlistDialogOpen && (
        <WatchlistItemAddDialog
          isOpen={isAddWatchlistDialogOpen}
          onClose={onAddWatchlistItemDialogClose}
        />
      )}

      {isConfirmOpen && (
        <ConfirmAlert
          isOpen={isConfirmOpen}
          title="관심 종목 삭제"
          onClose={onDeleteWatchlistItemAlertClose}
          onConfirm={onConfirmAction}>
          <span>
            '
            {`${selected[0].companyName}'${
              selected.length > 1 ? ` 외 ${selected.length - 1}개` : ""
            } 종목을 삭제하시겠습니까?`}
          </span>
        </ConfirmAlert>
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
  justify-content: space-between;
`;

const SelectedInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
