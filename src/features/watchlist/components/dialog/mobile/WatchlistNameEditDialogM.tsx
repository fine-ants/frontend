import Button from "@components/Buttons/Button";
import { IconButton } from "@components/Buttons/IconButton";
import SlideUpTransition from "@components/SlideUpTransition";
import { TextField } from "@components/TextField/TextField";
import useWatchlistNameEditMutation from "@features/watchlist/api/queries/useWatchlistNameEditMutation";
import { Dialog } from "@mui/material";
import designSystem from "@styles/designSystem";
import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

type Props = {
  currentWatchlistName: string;
  isOpen: boolean;
  onClose: () => void;
};

export default function WatchlistNameEditDialogM({
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

  const onSubmit = () => {
    if (newWatchlistName === currentWatchlistName) {
      onClose();
      return;
    }

    watchlistNameEditMutate(newWatchlistName);
  };

  const isInputEmpty = newWatchlistName === "";

  return (
    <Dialog
      fullScreen
      open={isOpen}
      onClose={onClose}
      TransitionComponent={SlideUpTransition}>
      <Header>
        <Title>리스트 이름 편집</Title>
        <IconButton
          icon="close"
          size="h40"
          iconColor="gray"
          onClick={onClose}
        />
      </Header>

      <Form onSubmit={onSubmit}>
        <InputWrapper>
          <Label htmlFor="watchlist-name">이름</Label>
          <TextField
            id="watchlist-name"
            size="h48"
            placeholder="리스트 이름을 입력하세요"
            value={newWatchlistName}
            onChange={(e) => setNewWatchlistName(e.target.value)}
            clearValue={onWatchlistNameClear}
          />
        </InputWrapper>

        <ButtonWrapper>
          <Button
            style={{ width: "100%" }}
            type="submit"
            variant="primary"
            size="h48"
            disabled={isInputEmpty}>
            <p>추가</p>
          </Button>
        </ButtonWrapper>
      </Form>
    </Dialog>
  );
}

const Header = styled.div`
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
  position: relative;
`;

const Title = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font: ${designSystem.font.title3.font};
  letter-spacing: ${designSystem.font.title3.letterSpacing};
  color: ${designSystem.color.neutral.gray800};
`;

const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  padding: 16px;
`;

const Label = styled.label`
  width: 120px;
  font: ${designSystem.font.title5.font};
  letter-spacing: ${designSystem.font.title5.letterSpacing};
  color: ${designSystem.color.neutral.gray800};
`;

const ButtonWrapper = styled.div`
  width: 100%;
  padding: 8px 16px;
`;
