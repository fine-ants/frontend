import ConfirmAlert from "@components/ConfirmAlert";
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
  const { isMobile } = useResponsiveLayout();

  const { value, onChange } = useText();

  const { mutate: deleteAccountMutate } = useAccountDeleteMutation();

  const onDeleteButtonClick = () => {
    deleteAccountMutate();
  };

  const isDeleteButtonDisabled = value !== "delete";

  return (
    <ConfirmAlert
      title="게정 삭제"
      isOpen={isOpen}
      isConfirmDisabled={isDeleteButtonDisabled}
      onConfirm={onDeleteButtonClick}
      onClose={onClose}>
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
    </ConfirmAlert>
  );
}

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
