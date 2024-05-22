import BIImage from "@assets/icons/logo/ic_fineants-footer.svg";
import isPageDepthOne from "@constants/isPageDepthOne";
import {
  MAIN_FOOTER_HEIGHT_D,
  MAIN_FOOTER_HEIGHT_M,
} from "@constants/styleConstants";
import useResponsiveLayout from "@hooks/useResponsiveLayout";
import designSystem from "@styles/designSystem";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

export default function Footer() {
  const { isMobile, isDesktop } = useResponsiveLayout();
  const location = useLocation();

  if (isMobile && !isPageDepthOne(location.pathname)) return null;

  return (
    <StyledFooter $isMobile={isMobile} $isDesktop={isDesktop}>
      <FooterLogo src={BIImage} alt="BIImage" $isMobile={isMobile} />
      <Copyright>FineAnts Ⓒ All rights reserved.</Copyright>
      {/* 추후 추가예정 */}
      {/* <IconContainer>
        <img src={youtubeIcon} alt="youtube 로고" />
        <img src={facebookIcon} alt="facebook 로고" />
        <img src={XIcon} alt="X 로고" />
        <img src={linkedinIcon} alt="linkedin 로고" />
        <img src={instagramIcon} alt="instagram 로고" />
      </IconContainer> */}
    </StyledFooter>
  );
}

const StyledFooter = styled.footer<{ $isMobile: boolean; $isDesktop: boolean }>`
  width: 100%;
  height: ${({ $isDesktop }) =>
    $isDesktop ? MAIN_FOOTER_HEIGHT_D : MAIN_FOOTER_HEIGHT_M}px;
  padding: ${({ $isDesktop }) => ($isDesktop ? "16px 40px" : "32px 0")};
  display: flex;
  flex-direction: ${({ $isMobile }) => ($isMobile ? "column" : "row")};
  align-items: center;
  gap: ${({ $isMobile }) => ($isMobile ? "8px" : "24px")};
  background-color: ${({ $isMobile }) =>
    $isMobile
      ? designSystem.color.neutral.gray50
      : designSystem.color.neutral.white};
  color: ${designSystem.color.neutral.gray600};
}`;

const FooterLogo = styled.img<{ $isMobile: boolean }>`
  width: ${({ $isMobile }) => ($isMobile ? "92px" : "127px")};
`;

const Copyright = styled.div`
  font: ${designSystem.font.body4.font};
  color: ${designSystem.color.neutral.gray600};
`;

// const IconContainer = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 16px;
// `;
