import designSystem from "@styles/designSystem";
import { ReactNode } from "react";
import styled from "styled-components";
import BaseDialog from "./BaseDialog";
import Button from "./Buttons/Button";
import { IconButton } from "./Buttons/IconButton";

type Props = {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  onConfirm: () => void;
  children?: ReactNode;
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
          <Header>
            <Title>{title}</Title>
            <IconButton
              icon="close"
              size="h40"
              iconColor="gray"
              onClick={onClose}
            />
          </Header>
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
  height: "280px",
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h3`
  width: 100%;
  text-align: left;
  font: ${designSystem.font.heading3.font};
  letter-spacing: ${designSystem.font.heading3.letterSpacing};
  color: ${designSystem.color.neutral.gray800};
`;

const Body = styled.div`
  width: 100%;
  max-height: 120px;
  margin-top: 32px;
  font: ${designSystem.font.title5.font};
  letter-spacing: ${designSystem.font.title5.letterSpacing};
  color: ${designSystem.color.neutral.gray800};
`;

const ButtonWrapper = styled.div`
  margin-left: auto;
  display: flex;
  gap: 8px;
`;
