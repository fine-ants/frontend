import useAccountDeleteMutation from "@api/settings/queries/useAccountDeleteMutation";
import { useText } from "@fineants/demolition";
import { IconButton } from "@mui/material";
import designSystem from "@styles/designSystem";
import styled from "styled-components";
import BaseDialog from "./BaseDialog";
import Button from "./common/Buttons/Button";
import { Icon } from "./common/Icon";
import { TextField } from "./common/TextField/TextField";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AccountDeleteDialog({ isOpen, onClose }: Props) {
  const { value, onChange } = useText();

  const { mutate: deleteAccountMutate } = useAccountDeleteMutation();

  const onDeleteButtonClick = () => {
    deleteAccountMutate();
  };

  const isDeleteButtonDisabled = value !== "delete";

  return (
    <BaseDialog style={baseDialogStyle} isOpen={isOpen} onClose={onClose}>
      <Header>
        <Title>계정 삭제</Title>
        <IconButton onClick={onClose}>
          <Icon icon="close" size={24} color="gray600" />
        </IconButton>
      </Header>

      <Description>
        <p>데이터 및 계정과 관련된 모든 정보가 삭제됩니다</p>
        <p>
          삭제를 진행하시려면 아래의 입력란에 <b>"delete"</b>을 입력하세요
        </p>
      </Description>

      <TextField
        size="h32"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        clearValue={() => onChange("")}
      />

      <ButtonsContainer>
        <Button variant="tertiary" size="h32" onClick={onClose}>
          취소
        </Button>
        <Button
          variant="primary"
          size="h32"
          disabled={isDeleteButtonDisabled}
          onClick={onDeleteButtonClick}>
          삭제
        </Button>
      </ButtonsContainer>
    </BaseDialog>
  );
}

const baseDialogStyle = {
  width: "544px",
  height: "auto",
};

const Header = styled.header`
  margin-bottom: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.div`
  font: ${designSystem.font.heading3};
  color: ${designSystem.color.neutral.gray800};
  letter-spacing: -0.02rem;s
`;

const Description = styled.div`
  margin-bottom: 24px;

  > p {
    font: ${designSystem.font.title5};
    color: ${designSystem.color.neutral.gray800};

    &:first-of-type {
      margin-bottom: 4px;
    }
  }
`;

const ButtonsContainer = styled.div`
  width: 100%;
  margin-top: 30px;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;
