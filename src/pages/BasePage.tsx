import Footer from "@components/Footer";
import NavBarFixed from "@components/NavBar/NavBarFixed";
import useResponsiveLayout from "@hooks/useResponsiveLayout";
import designSystem from "@styles/designSystem";
import { ReactNode } from "react";
import styled from "styled-components";

type Props = {
  children: ReactNode;
};

export default function BasePage({ children }: Props) {
  const { isMobile } = useResponsiveLayout();

  return (
    <StyledBasePage $isMobile={isMobile}>
      <Main>{children}</Main>
      <Footer />

      {isMobile && <NavBarFixed />}
    </StyledBasePage>
  );
}

const StyledBasePage = styled.div<{ $isMobile: boolean }>`
  width: 100%;
  height: inherit;
  min-height: inherit;
  padding-bottom: ${({ $isMobile }) => ($isMobile ? "64px" : 0)};
  display: flex;
  flex-direction: column;
  background-color: ${designSystem.color.neutral.gray50};
`;

const Main = styled.main`
  width: 100%;
  height: 100%;
  padding-bottom: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
`;
