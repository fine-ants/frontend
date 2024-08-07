import BaseDialog from "@components/BaseDialog";
import Button from "@components/Buttons/Button";
import { IconButton } from "@components/Buttons/IconButton";
import { TextField } from "@components/TextField/TextField";
import useWatchlistsAddMutation from "@features/watchlist/api/queries/useWatchlistsAddMutation";
import designSystem from "@styles/designSystem";
import { FormEvent, useState } from "react";
import styled, { CSSProperties } from "styled-components";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function NewWatchlistDialogD({ isOpen, onClose }: Props) {
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
    <BaseDialog style={StyledDialog} isOpen={isOpen} onClose={onClose}>
      <Header>
        <Title>새 리스트 추가</Title>
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

const StyledDialog: CSSProperties = {
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
