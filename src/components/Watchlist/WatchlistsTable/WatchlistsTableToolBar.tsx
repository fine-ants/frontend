import { WatchlistsType } from "@api/watchlist";
import useWatchlistsDeleteMutation from "@api/watchlist/queries/useWatchlistsDeleteMutation";
import dividerIcon from "@assets/icons/ic_divider.svg";
import trashIcon from "@assets/icons/ic_trash.svg";
import ConfirmAlert from "@components/ConfirmAlert";
import Button from "@components/common/Buttons/Button";
import { Icon } from "@components/common/Icon";
import { Toolbar, Tooltip, Typography } from "@mui/material";
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

            <img src={dividerIcon} alt="" />

            <Tooltip title="포트폴리오 삭제">
              <Button
                variant="tertiary"
                size="h32"
                onClick={onDeleteWatchlistsButtonClick}>
                <img src={trashIcon} alt="선택된 포트폴리오 삭제" />
                <span>삭제</span>
              </Button>
            </Tooltip>
          </>
        )}
      </SelectedInfoContainer>

      <AddNewWatchlistButton
        variant="primary"
        size="h32"
        onClick={onAddNewWatchlistButtonClick}>
        <Icon icon="folder-add" size={16} color="white" />
        <span>새 리스트 추가</span>
      </AddNewWatchlistButton>

      {isNewWatchlistDialogOpen && (
        <NewWatchlistDialog
          isOpen={isNewWatchlistDialogOpen}
          onClose={onNewWatchlistDialogClose}
        />
      )}

      {isConfirmOpen && (
        <ConfirmAlert
          isOpen={isConfirmOpen}
          title="관심 종목 목록 삭제"
          onClose={onDeleteWatchlistsAlertClose}
          onConfirm={onConfirmAction}>
          <span>
            {`${selected[0].name}${
              selected.length > 1 ? ` 외 ${selected.length - 1}개` : ""
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
  margin-bottom: 16px;
  padding: 0;
  display: flex;
  justify-content: space-between;
`;

const SelectedInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const AddNewWatchlistButton = styled(Button)`
  width: 126px;
`;
