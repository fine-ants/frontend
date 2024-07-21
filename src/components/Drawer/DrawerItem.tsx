import designSystem from "@styles/designSystem";
import { ReactNode } from "react";
import styled from "styled-components";

type Props = {
  onClick: () => void;
  children: ReactNode;
};

export default function DrawerItem({ onClick, children }: Props) {
  return (
    <StyledDrawerItem>
      <ItemButton onClick={onClick}>{children}</ItemButton>
    </StyledDrawerItem>
  );
}

const StyledDrawerItem = styled.li`
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
  padding: 0 16px;

  &:active {
    background-color: ${designSystem.color.neutral.gray50};
  }
`;

const ItemButton = styled.button`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 8px;
  align-items: center;
  font: ${designSystem.font.title4.font};
  letter-spacing: ${designSystem.font.title4.letterSpacing};
`;
