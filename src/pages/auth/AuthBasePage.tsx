import AuthPageNavD from "@features/auth/components/AuthPageNav/desktop/AuthPageNavD";
import useResponsiveLayout from "@hooks/useResponsiveLayout";
import designSystem from "@styles/designSystem";
import { ReactNode } from "react";
import styled from "styled-components";

type Props = {
  children: ReactNode;
};

export default function AuthBasePage({ children }: Props) {
  const { isDesktop } = useResponsiveLayout();

  return (
    <StyledBasePage $isDesktop={isDesktop}>
      {isDesktop && <AuthPageNavD />}
      {children}
    </StyledBasePage>
  );
}

const StyledBasePage = styled.div<{ $isDesktop: boolean }>`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${designSystem.color.neutral.white};
  overflow: scroll;
`;
