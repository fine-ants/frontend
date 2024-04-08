import useWatchlistsAddMutation from "@api/watchlist/queries/useWatchlistsAddMutation";
import BaseDialog from "@components/BaseDialog";
import Button from "@components/common/Buttons/Button";
import { IconButton } from "@components/common/Buttons/IconButton";
import { TextField } from "@components/common/TextField/TextField";
import designSystem from "@styles/designSystem";
import { useState } from "react";
import styled from "styled-components";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function NewWatchlistDialog({ isOpen, onClose }: Props) {
  const { mutate: watchlistAddMutate } = useWatchlistsAddMutation({
    onCloseDialog: onClose,
  });

  const [newWatchlistName, setNewWatchlistName] = useState("");

  const isInputEmpty = newWatchlistName === "";

  const onWatchlistNameClear = () => {
    setNewWatchlistName("");
  };

  const addItemToWatchlist = () => {
    if (!isInputEmpty) {
      watchlistAddMutate(newWatchlistName);
    }
  };

  return (
    <BaseDialog style={StyledDialog} isOpen={isOpen} onClose={onClose}>
      <div>
        <Upper>
          <Label>새 리스트 추가</Label>
          <IconButton
            icon="close"
            size="h40"
            iconColor="gray"
            onClick={onClose}
          />
        </Upper>
        <InputWrapper>
          <p>이름</p>
          <TextField
            value={newWatchlistName}
            onChange={(e) => setNewWatchlistName(e.target.value)}
            clearValue={onWatchlistNameClear}
          />
        </InputWrapper>
      </div>

      <div style={{ marginLeft: "auto" }}>
        <Button
          variant="primary"
          size="h32"
          disabled={isInputEmpty}
          onClick={addItemToWatchlist}>
          <p>추가</p>
        </Button>
      </div>
    </BaseDialog>
  );
}

const StyledDialog = {
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
`;

const Label = styled.label`
  font: ${designSystem.font.heading3.font};
  letter-spacing: ${designSystem.font.heading3.letterSpacing};
  color: ${designSystem.color.neutral.gray800};
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 24px;

  p {
    display: flex;
    align-items: center;
    width: 120px;
    height: 24px;
    font: ${designSystem.font.title5.font};
    letter-spacing: ${designSystem.font.title5.letterSpacing};
    color: ${designSystem.color.neutral.gray800};
  }
`;
