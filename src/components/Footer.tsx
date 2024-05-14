import BIImage from "@assets/icons/logo/ic_fineants-footer.svg";
import { MAIN_FOOTER_HEIGHT } from "@constants/styleConstants";
import designSystem from "@styles/designSystem";
import styled from "styled-components";

export default function Footer() {
  return (
    <StyledFooter>
      <FooterLeft>
        <img src={BIImage} alt="BIImage" />
        <Copyright>FineAnts Ⓒ All rights reserved.</Copyright>
      </FooterLeft>
      <IconContainer>
        {/* <img src={youtubeIcon} alt="youtube 로고" />
        <img src={facebookIcon} alt="facebook 로고" />
        <img src={XIcon} alt="X 로고" />
        <img src={linkedinIcon} alt="linkedin 로고" />
        <img src={instagramIcon} alt="instagram 로고" /> */}
        {/* 추후 추가예정 */}
      </IconContainer>
    </StyledFooter>
  );
}

const StyledFooter = styled.footer`
  width: 100%;
  height: ${MAIN_FOOTER_HEIGHT}px;
  padding: 0 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  color: #959da5;
`;

const FooterLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const Copyright = styled.div`
  font: ${designSystem.font.body4.font};
  color: ${designSystem.color.neutral.gray600};
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;
