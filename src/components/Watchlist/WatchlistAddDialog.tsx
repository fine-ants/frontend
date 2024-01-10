import useWatchlistsAddMutation from "@api/watchlist/queries/useWatchlistsAddMutation";
import BaseDialog from "@components/BaseDialog";
import Button from "@components/common/Buttons/Button";
import { Icon } from "@components/common/Icon";
import { useState } from "react";
import styled from "styled-components";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function WatchlistAddDialog({ isOpen, onClose }: Props) {
  const { mutate: watchlistAddMutate } = useWatchlistsAddMutation({
    onCloseDialog: onClose,
  });

  const [newWatchlistName, setNewWatchlistName] = useState("");

  const addItemToWatchlist = () => {
    watchlistAddMutate(newWatchlistName);
  };

  return (
    <BaseDialog style={StyledDialog} isOpen={isOpen} onClose={onClose}>
      <div>
        <Upper>
          <Label>새 리스트 추가</Label>
          <IconButton onClick={onClose}>
            <Icon icon="close" size={24} color="gray600" />
          </IconButton>
        </Upper>
        <InputWrapper>
          <span>이름</span>
          <input
            type="text"
            value={newWatchlistName}
            onChange={(e) => setNewWatchlistName(e.target.value)}
          />
        </InputWrapper>
      </div>

      <div style={{ marginLeft: "auto" }}>
        <Button variant="primary" size="h32" onClick={addItemToWatchlist}>
          <span>추가</span>
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

const IconButton = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Label = styled.label`
  font: ${({ theme: { font } }) => font.heading3.font};
  letter-spacing: ${({ theme: { font } }) => font.heading3.letterSpacing};
  color: ${({ theme: { color } }) => color.neutral.gray800};
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 24px;

  span {
    display: flex;
    align-items: center;
    width: 120px;
    height: 24px;
    font: ${({ theme: { font } }) => font.title5.font};
    letter-spacing: ${({ theme: { font } }) => font.title5.letterSpacing};
    color: ${({ theme: { color } }) => color.neutral.gray800};
  }

  input {
    width: 352px;
    height: 32px;
    border-radius: 3px;
    border: 1px solid ${({ theme: { color } }) => color.neutral.gray200};
    padding: 4px 8px;
    box-sizing: border-box;
    font: ${({ theme: { font } }) => font.body3.font};
    color: ${({ theme: { color } }) => color.neutral.gray800};

    &:focus {
      outline: none;
      border: 1px solid ${({ theme: { color } }) => color.primary.blue500};
    }

    &::placeholder {
      color: ${({ theme: { color } }) => color.neutral.gray400};
    }
  }
`;
