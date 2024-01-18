import facebookIcon from "@assets/icons/logo/ic_facebook.svg";
import BIImage from "@assets/icons/logo/ic_fineants-footer.svg";
import instagramIcon from "@assets/icons/logo/ic_instagram.svg";
import linkedinIcon from "@assets/icons/logo/ic_linkedin.svg";
import XIcon from "@assets/icons/logo/ic_x.svg";
import youtubeIcon from "@assets/icons/logo/ic_youtube.svg";
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
        <img src={youtubeIcon} alt="youtube 로고" />
        <img src={facebookIcon} alt="facebook 로고" />
        <img src={XIcon} alt="X 로고" />
        <img src={linkedinIcon} alt="linkedin 로고" />
        <img src={instagramIcon} alt="instagram 로고" />
      </IconContainer>
    </StyledFooter>
  );
}

const StyledFooter = styled.footer`
  width: 100%;
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  color: #959da5;
  padding: 0 40px;
`;

const FooterLeft = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
`;

const Copyright = styled.div`
  color: ${({ theme: { color } }) => color.gray600};
  font: ${designSystem.font.body4.font};
`;

const IconContainer = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;
