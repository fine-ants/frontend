import Footer from "@components/Footer";
import NavBarFixed from "@components/NavBar/NavBarFixed";
import {
  MAIN_FOOTER_HEIGHT,
  MAIN_HEADER_TOTAL_HEIGHT_D,
  MAIN_HEADER_TOTAL_HEIGHT_M,
} from "@constants/styleConstants";
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
      <Main $isMobile={isMobile}>{children}</Main>
      <Footer />

      {isMobile && <NavBarFixed />}
    </StyledBasePage>
  );
}

const StyledBasePage = styled.div<{ $isMobile: boolean }>`
  width: 100%;
  padding-bottom: ${({ $isMobile }) => ($isMobile ? "64px" : 0)};
  display: flex;
  flex-direction: column;
  background-color: ${({ $isMobile }) =>
    $isMobile
      ? designSystem.color.neutral.white
      : designSystem.color.neutral.gray50};
`;

const Main = styled.main<{ $isMobile: boolean }>`
  width: 100%;
  min-height: calc(
    100vh -
      ${({ $isMobile }) =>
        $isMobile
          ? `${MAIN_HEADER_TOTAL_HEIGHT_M}px`
          : `${MAIN_HEADER_TOTAL_HEIGHT_D}px`} - ${MAIN_FOOTER_HEIGHT}px
  );

  padding-bottom: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
