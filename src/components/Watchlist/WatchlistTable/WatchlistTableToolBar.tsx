import { WatchlistItemType } from "@api/watchlist";
import useWatchlistItemDeleteMutation from "@api/watchlist/queries/useWatchlistItemDeleteMutation";
import dividerIcon from "@assets/icons/ic_divider.svg";
import trashIcon from "@assets/icons/ic_trash.svg";
import ConfirmAlert from "@components/ConfirmAlert";
import Button from "@components/common/Buttons/Button";
import { Icon } from "@components/common/Icon";
import { Toolbar, Tooltip, Typography } from "@mui/material";
import designSystem from "@styles/designSystem";
import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import WatchlistItemAddDialog from "../WatchlistItemAddDialog";

interface Props {
  selected: readonly WatchlistItemType[];
}

export default function WatchlistTableToolBar({ selected }: Props) {
  const { watchlistId } = useParams();

  const { mutate: watchlistItemDeleteMutate } = useWatchlistItemDeleteMutation(
    Number(watchlistId)
  );

  const [isAddWatchlistDialogOpen, setIsAddWatchlistDialogOpen] =
    useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const onAddWatchlistItemButtonClick = () => {
    setIsAddWatchlistDialogOpen(true);
  };

  const onAddWatchlistItemDialogClose = () => {
    setIsAddWatchlistDialogOpen(false);
  };

  const onDeleteWatchlistItemButtonClick = () => {
    setIsConfirmOpen(true);
  };

  const onDeleteWatchlistItemAlertClose = () => {
    setIsConfirmOpen(false);
  };

  const onConfirmAction = () => {
    const tickerSymbols = selected.map((item) => item.tickerSymbol);
    watchlistItemDeleteMutate(tickerSymbols);
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

            <img src={dividerIcon} alt="" />

            <Tooltip title="선택된 종목 삭제">
              <Button
                variant="tertiary"
                size="h32"
                onClick={onDeleteWatchlistItemButtonClick}>
                <img src={trashIcon} alt="선택된 종목 삭제" />
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
        <Icon icon="add" size={12} color="white" />
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
            {`${selected[0].companyName}${
              selected.length > 1 && ` 외 ${selected.length - 1}개`
            } 항목을 삭제하시겠습니까?`}
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
