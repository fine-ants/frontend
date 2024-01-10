import styled from "styled-components";
import BaseDialog from "./BaseDialog";
import Button from "./common/Buttons/Button";

type Props = {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  onConfirm: () => void;
  children?: React.ReactNode;
};

export default function ConfirmAlert({
  isOpen,
  title,
  onClose,
  onConfirm,
  children,
}: Props) {
  const onConfirmAlertClose = () => {
    onConfirm();
    onClose();
  };

  return (
    <BaseDialog style={ConfirmAlertStyle} isOpen={isOpen} onClose={onClose}>
      <Wrapper>
        <div>
          <Title>{title}</Title>
          <Body>{children}</Body>
        </div>
        <ButtonWrapper>
          <Button variant="tertiary" size="h32" onClick={onClose}>
            <span>취소</span>
          </Button>
          <Button variant="primary" size="h32" onClick={onConfirmAlertClose}>
            <span>확인</span>
          </Button>
        </ButtonWrapper>
      </Wrapper>
    </BaseDialog>
  );
}

const ConfirmAlertStyle = {
  width: "544px",
  height: "280px",
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.div`
  width: 100%;
  text-align: left;
  font: ${({ theme: { font } }) => font.heading3.font};
  letter-spacing: ${({ theme: { font } }) => font.heading3.letterSpacing};
  color: ${({ theme: { color } }) => color.neutral.gray800};
`;

const Body = styled.div`
  margin-top: 32px;
  width: 100%;
  max-height: 120px;
  font: ${({ theme: { font } }) => font.title5.font};
  letter-spacing: ${({ theme: { font } }) => font.title5.letterSpacing};
  color: ${({ theme: { color } }) => color.neutral.gray800};
`;

const ButtonWrapper = styled.div`
  margin-left: auto;
  display: flex;
  gap: 8px;
`;
