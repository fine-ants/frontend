import designSystem from "@styles/designSystem";
import { ReactNode } from "react";
import styled from "styled-components";

type Props = {
  title: string;
  children: ReactNode;
};

export function CardItemRow({ title, children }: Props) {
  return (
    <StyledItemRow>
      <SubTitle>{title}</SubTitle>
      {children}
    </StyledItemRow>
  );
}

const StyledItemRow = styled.div`
  min-height: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SubTitle = styled.div`
  font: ${designSystem.font.title5.font};
  letter-spacing: ${designSystem.font.title5.letterSpacing};
  color: ${designSystem.color.neutral.gray600};
`;
