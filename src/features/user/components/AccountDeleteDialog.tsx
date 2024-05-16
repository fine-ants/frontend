import BaseDialog from "@components/BaseDialog";
import Button from "@components/Buttons/Button";
import { IconButton } from "@components/Buttons/IconButton";
import { TextField } from "@components/TextField/TextField";
import useAccountDeleteMutation from "@features/user/api/queries/useAccountDeleteMutation";
import { useText } from "@fineants/demolition";
import useResponsiveLayout from "@hooks/useResponsiveLayout";
import designSystem from "@styles/designSystem";
import styled from "styled-components";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AccountDeleteDialog({ isOpen, onClose }: Props) {
  const { isDesktop, isMobile } = useResponsiveLayout();

  const { value, onChange } = useText();

  const { mutate: deleteAccountMutate } = useAccountDeleteMutation();

  const onDeleteButtonClick = () => {
    deleteAccountMutate();
  };

  const isDeleteButtonDisabled = value !== "delete";

  return (
    <BaseDialog style={baseDialogStyle} isOpen={isOpen} onClose={onClose}>
      <Header $isMobile={isMobile}>
        <Title $isMobile={isMobile}>계정 삭제</Title>
        {isDesktop && (
          <IconButton
            icon="close"
            size="h40"
            iconColor="gray"
            onClick={onClose}
          />
        )}
      </Header>

      <Description $isMobile={isMobile}>
        <p>데이터 및 계정과 관련된 모든 정보가 삭제됩니다</p>
        <p>
          삭제를 진행하시려면 아래의 입력란에 <b>"delete"</b>을 입력하세요
        </p>
      </Description>

      <TextField
        size="h32"
        placeholder="delete"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        clearValue={() => onChange("")}
      />

      <ButtonsContainer $isMobile={isMobile}>
        <Button
          variant="tertiary"
          size={isMobile ? "h40" : "h32"}
          onClick={onClose}>
          취소
        </Button>
        <Button
          variant="primary"
          size={isMobile ? "h40" : "h32"}
          disabled={isDeleteButtonDisabled}
          onClick={onDeleteButtonClick}>
          삭제
        </Button>
      </ButtonsContainer>
    </BaseDialog>
  );
}

const baseDialogStyle = {
  height: "auto",
};

const Header = styled.header<{ $isMobile: boolean }>`
  margin-bottom: ${({ $isMobile }) => ($isMobile ? "16px" : "32px")};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.div<{ $isMobile: boolean }>`
  font: ${({ $isMobile }) =>
    $isMobile
      ? designSystem.font.heading4.font
      : designSystem.font.heading3.font};
  letter-spacing: ${({ $isMobile }) =>
    $isMobile
      ? designSystem.font.heading4.letterSpacing
      : designSystem.font.heading3.letterSpacing};
  color: ${designSystem.color.neutral.gray800};
`;

const Description = styled.div<{ $isMobile: boolean }>`
  margin-bottom: ${({ $isMobile }) => ($isMobile ? "16px" : "24px")};

  > p {
    font: ${designSystem.font.title5.font};
    letter-spacing: ${designSystem.font.title5.letterSpacing};
    color: ${designSystem.color.neutral.gray800};

    &:first-of-type {
      margin-bottom: 4px;
    }
  }
`;

const ButtonsContainer = styled.div<{ $isMobile: boolean }>`
  width: 100%;
  margin-top: ${({ $isMobile }) => ($isMobile ? "24px" : "30px")};
  display: flex;
  justify-content: flex-end;
  gap: 8px;

  > button {
    flex-grow: ${({ $isMobile }) => ($isMobile ? 1 : 0)};
  }
`;
