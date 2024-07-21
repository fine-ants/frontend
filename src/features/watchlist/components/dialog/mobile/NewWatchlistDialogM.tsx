import BaseDialog from "@components/BaseDialog";
import Button from "@components/Buttons/Button";
import { IconButton } from "@components/Buttons/IconButton";
import SlideUpTransition from "@components/SlideUpTransition";
import { TextField } from "@components/TextField/TextField";
import useWatchlistsAddMutation from "@features/watchlist/api/queries/useWatchlistsAddMutation";
import designSystem from "@styles/designSystem";
import { FormEvent, useState } from "react";
import styled from "styled-components";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function NewWatchlistDialogM({ isOpen, onClose }: Props) {
  const { mutate: watchlistAddMutate } = useWatchlistsAddMutation({
    onCloseDialog: onClose,
  });

  const [newWatchlistName, setNewWatchlistName] = useState("");

  const isInputEmpty = newWatchlistName === "";

  const onWatchlistNameClear = () => {
    setNewWatchlistName("");
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!isInputEmpty) {
      watchlistAddMutate(newWatchlistName);
    }
  };

  return (
    <BaseDialog
      fullScreen
      isOpen={isOpen}
      onClose={onClose}
      TransitionComponent={SlideUpTransition}>
      <Header>
        <IconButton
          icon="close"
          size="h40"
          iconColor="custom"
          customColor={{ color: "gray800", hoverColor: "gray50" }}
          onClick={onClose}
        />
        <Title>새 리스트 추가</Title>
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
    </BaseDialog>
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
  width: 100%;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
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
