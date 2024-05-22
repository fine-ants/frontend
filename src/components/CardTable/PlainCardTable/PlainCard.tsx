import designSystem from "@styles/designSystem";
import { ReactNode } from "react";
import styled from "styled-components";

type Props = {
  CardHeader: ReactNode;
  CardBody: ReactNode;
};

export function PlainCard({ CardHeader, CardBody }: Props) {
  return (
    <StyledPlainCard>
      <StyledCardHeader>{CardHeader}</StyledCardHeader>
      <StyledCardBody>{CardBody}</StyledCardBody>
    </StyledPlainCard>
  );
}

const StyledPlainCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 16px;
  border-bottom: 1px solid ${designSystem.color.neutral.gray100};
`;

const StyledCardHeader = styled.div`
  min-height: 32px;
  display: flex;
  align-items: center;
  gap: 8px;
  font: ${designSystem.font.title4.font};
  letter-spacing: ${designSystem.font.title4.letterSpacing};
  color: ${designSystem.color.neutral.gray800};
  margin-bottom: 16px;
`;

const StyledCardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
