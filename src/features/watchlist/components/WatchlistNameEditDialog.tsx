import BaseDialog from "@components/BaseDialog";
import Button from "@components/Buttons/Button";
import { IconButton } from "@components/Buttons/IconButton";
import { TextField } from "@components/TextField/TextField";
import useWatchlistNameEditMutation from "@features/watchlist/api/queries/useWatchlistNameEditMutation";
import designSystem from "@styles/designSystem";
import { useState } from "react";
import { useParams } from "react-router-dom";
import styled, { CSSProperties } from "styled-components";

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

  const onSubmit = () => {
    if (newWatchlistName === currentWatchlistName) {
      onClose();
      return;
    }

    watchlistNameEditMutate(newWatchlistName);
  };

  const isInputEmpty = newWatchlistName === "";

  return (
    <BaseDialog style={styledDialog} isOpen={isOpen} onClose={onClose}>
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
            size="h32"
            placeholder="리스트 이름을 입력하세요"
            value={newWatchlistName}
            onChange={(e) => setNewWatchlistName(e.target.value)}
            clearValue={onWatchlistNameClear}
          />
        </InputWrapper>

        <div style={{ marginLeft: "auto" }}>
          <Button
            type="submit"
            variant="primary"
            size="h32"
            disabled={isInputEmpty}>
            <p>추가</p>
          </Button>
        </div>
      </Form>
    </BaseDialog>
  );
}

const styledDialog: CSSProperties = {
  height: "280px",
  display: "flex",
  flexDirection: "column",
  gap: "32px",
  borderRadius: "8px",
};

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h3`
  font: ${designSystem.font.heading3.font};
  letter-spacing: ${designSystem.font.heading3.letterSpacing};
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
  display: flex;
  align-items: center;
`;

const Label = styled.label`
  width: 120px;
  font: ${designSystem.font.title5.font};
  letter-spacing: ${designSystem.font.title5.letterSpacing};
  color: ${designSystem.color.neutral.gray800};
`;
