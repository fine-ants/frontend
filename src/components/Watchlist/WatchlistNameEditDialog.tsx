import useWatchlistNameEditMutation from "@api/watchlist/queries/useWatchlistNameEditMutation";
import BaseDialog from "@components/BaseDialog";
import Button from "@components/common/Buttons/Button";
import { Icon } from "@components/common/Icon";
import { TextField } from "@components/common/TextField/TextField";
import designSystem from "@styles/designSystem";
import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

type Props = {
  currentWatchlistName: string;
  isOpen: boolean;
  onClose: () => void;
};

export default function WatchlistNameEditDialog({
  currentWatchlistName,
  isOpen,
  onClose,
}: Props) {
  const { watchlistId } = useParams();

  const { mutate: watchlistNameEditMutate } = useWatchlistNameEditMutation({
    watchlistId: Number(watchlistId),
    onCloseDialog: onClose,
  });

  const [newWatchlistName, setNewWatchlistName] =
    useState(currentWatchlistName);

  const onWatchlistNameClear = () => {
    setNewWatchlistName("");
  };

  const onEditButtonClick = () => {
    if (newWatchlistName === currentWatchlistName) {
      onClose();
      return;
    }

    watchlistNameEditMutate(newWatchlistName);
  };

  return (
    <BaseDialog style={styledDialog} isOpen={isOpen} onClose={onClose}>
      <div>
        <Upper>
          <Label>리스트 이름 편집</Label>
          <IconButton onClick={onClose}>
            <Icon icon="close" size={24} color="gray600" />
          </IconButton>
        </Upper>
        <InputWrapper>
          <p>이름</p>
          <TextField
            size="h32"
            value={newWatchlistName}
            onChange={(e) => setNewWatchlistName(e.target.value)}
            clearValue={onWatchlistNameClear}
          />
        </InputWrapper>
      </div>

      <Button
        style={{ marginLeft: "auto" }}
        variant="primary"
        size="h32"
        onClick={onEditButtonClick}>
        저장
      </Button>
    </BaseDialog>
  );
}

const styledDialog = {
  width: "544px",
  height: "280px",
  borderRadius: "8px",
  display: "flex",
  flexDirection: "column" as const,
  justifyContent: "space-between",
};

const Upper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  margin-bottom: 29px;
`;

const IconButton = styled.button`
  position: relative;
  right: -6px;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;

  p {
    display: flex;
    align-items: center;
    width: 120px;
    height: 24px;
    font: ${designSystem.font.title5.font};
    letter-spacing: ${designSystem.font.title5.letterSpacing};
  }
`;

const Label = styled.p`
  font: ${designSystem.font.heading3.font};
  letter-spacing: ${designSystem.font.heading3.letterSpacing};
`;
