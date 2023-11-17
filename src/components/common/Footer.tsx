import facebookIcon from "@assets/icons/facebook.svg";
import instagramIcon from "@assets/icons/instagram.svg";
import linkedinIcon from "@assets/icons/linkedin.svg";
import XIcon from "@assets/icons/x.svg";
import youtubeIcon from "@assets/icons/youtube.svg";
import profileImage from "@assets/images/profileImage.png";
import styled from "styled-components";

export default function Footer() {
  return (
    <StyledFooter>
      <FooterLeft>
        <BI>
          <img src={profileImage} alt="" />
          <div>FineAnts</div>
        </BI>
        <Copyright>FineAnts Ⓒ All rights reserved.</Copyright>
      </FooterLeft>
      <IconContainer>
        <img src={youtubeIcon} alt="youtube" />
        <img src={facebookIcon} alt="facebook" />
        <img src={XIcon} alt="X" />
        <img src={linkedinIcon} alt="linkedin" />
        <img src={instagramIcon} alt="instagram" />
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

const BI = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  color: #b3b3c1;
  font-size: 20px;
  font-weight: bold;
`;

const Copyright = styled.div`
  color: #6a6b77;
`;

const IconContainer = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;
