import useResponsiveLayout from "@hooks/useResponsiveLayout";
import designSystem from "@styles/designSystem";
import { ReactNode } from "react";
import styled from "styled-components";
import BaseDialog from "./BaseDialog";
import Button from "./Buttons/Button";
import { IconButton } from "./Buttons/IconButton";

type Props = {
  isOpen: boolean;
  title: string;
  isConfirmDisabled?: boolean;
  onClose: () => void;
  onConfirm: () => void;
  children?: ReactNode;
};

export default function ConfirmAlert({
  isOpen,
  title,
  isConfirmDisabled = false,
  onClose,
  onConfirm,
  children,
}: Props) {
  const { isDesktop, isMobile } = useResponsiveLayout();

  const onConfirmAlertClose = () => {
    if (!isConfirmDisabled) {
      onConfirm();
    }
    onClose();
  };

  return (
    <BaseDialog
      style={confirmAlertStyle(isMobile)}
      isOpen={isOpen}
      onClose={onClose}>
      <Wrapper>
        <div>
          <Header>
            <Title $isMobile={isMobile}>{title}</Title>
            {isDesktop && (
              <IconButton
                icon="close"
                size="h40"
                iconColor="gray"
                onClick={onClose}
              />
            )}
          </Header>
          <Body $isMobile={isMobile}>{children}</Body>
        </div>
        <ButtonWrapper $isMobile={isMobile}>
          <Button
            variant="tertiary"
            size={isMobile ? "h40" : "h32"}
            onClick={onClose}>
            <span>취소</span>
          </Button>
          <Button
            variant="primary"
            size={isMobile ? "h40" : "h32"}
            onClick={onConfirmAlertClose}
            disabled={isConfirmDisabled}>
            <span>삭제</span>
          </Button>
        </ButtonWrapper>
      </Wrapper>
    </BaseDialog>
  );
}

const confirmAlertStyle = (isMobile: boolean) => {
  return {
    width: isMobile ? "100%" : "544px",
    height: isMobile ? "auto" : "280px",
    minHeight: "200px",
    padding: "24px",
  };
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h3<{ $isMobile: boolean }>`
  width: 100%;
  padding: ${({ $isMobile }) => ($isMobile ? "8px 0" : "0")};
  text-align: left;
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

const Body = styled.div<{ $isMobile: boolean }>`
  width: 100%;
  max-height: 120px;
  margin-top: ${({ $isMobile }) => ($isMobile ? "8px" : "32px")};
  font: ${designSystem.font.title5.font};
  letter-spacing: ${designSystem.font.title5.letterSpacing};
  color: ${designSystem.color.neutral.gray800};
`;

const ButtonWrapper = styled.div<{ $isMobile: boolean }>`
  width: 100%;
  margin-top: 16px;
  display: flex;
  justify-content: ${({ $isMobile }) => ($isMobile ? "center" : "right")};
  gap: 8px;

  > button {
    width: ${({ $isMobile }) => ($isMobile ? "100%" : "auto")};
  }
`;
