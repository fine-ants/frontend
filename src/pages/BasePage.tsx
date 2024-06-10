import Footer from "@components/Footer";
import NavBarFixed from "@components/NavBar/NavBarFixed";
import {
  IOS_HOME_INDICATOR_HEIGHT,
  MAIN_FOOTER_HEIGHT_D,
  MAIN_HEADER_TOTAL_HEIGHT_D,
  MAIN_HEADER_TOTAL_HEIGHT_M,
} from "@constants/styleConstants";
import useDevice from "@hooks/useDevice";
import useResponsiveLayout from "@hooks/useResponsiveLayout";
import designSystem from "@styles/designSystem";
import { ReactNode } from "react";
import styled from "styled-components";

type Props = {
  children: ReactNode;
};

export default function BasePage({ children }: Props) {
  const { isMobile } = useResponsiveLayout();
  const { isPWADevice, isIOSDevice } = useDevice();

  const isIOSPWA = isIOSDevice && isPWADevice;

  return (
    <StyledBasePage $isMobile={isMobile} $isIOSPWA={isIOSPWA}>
      <Main $isMobile={isMobile}>{children}</Main>
      <Footer />

      {isMobile && <NavBarFixed />}
    </StyledBasePage>
  );
}

const StyledBasePage = styled.div<{ $isMobile: boolean; $isIOSPWA: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: ${({ $isMobile, $isIOSPWA }) =>
    $isMobile && $isIOSPWA
      ? `calc(${IOS_HOME_INDICATOR_HEIGHT}px + 64px)`
      : $isMobile
      ? "64px"
      : "0"};

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
          : `${MAIN_HEADER_TOTAL_HEIGHT_D}px`} - ${MAIN_FOOTER_HEIGHT_D}px
  );

  padding-bottom: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
