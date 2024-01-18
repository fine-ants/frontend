import { Button } from "@mui/material";
import { ReactNode } from "react";
import styled from "styled-components";
import BaseDialog from "./BaseDialog";

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
        <Title>{title}</Title>
        <Body>{children}</Body>
        <ButtonWrapper>
          <CancelButton onClick={onClose}>취소</CancelButton>
          <Button onClick={onConfirmAlertClose}>확인</Button>
        </ButtonWrapper>
      </Wrapper>
    </BaseDialog>
  );
}

const ConfirmAlertStyle = {
  width: "400px",
  height: "auto",
  maxHeight: "300px",
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
  font-size: 16px;
  font-weight: bold;
`;

const Body = styled.div`
  width: 100%;
  max-height: 120px;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  text-align: right;
`;

const CancelButton = styled(Button)`
  color: red;
`;
