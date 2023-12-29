import { postOAuthUrl } from "@api/auth";
import { HTTPSTATUS } from "@api/types";
import naverLogo from "@assets/icons/logo/ic_naver.svg";
import { WindowContext } from "@context/WindowContext";
import designSystem from "@styles/designSystem";
import openPopUpWindow from "@utils/openPopUpWindow";
import { useContext } from "react";
import styled from "styled-components";
import { BaseSignInButton } from "./BaseSignInButton";

export default function NaverSignInButton() {
  const { onOpenPopUpWindow } = useContext(WindowContext);

  const onNaverSignIn = async () => {
    const res = await postOAuthUrl("naver");

    if (res.code === HTTPSTATUS.success) {
      const oAuthPopUpWindow = openPopUpWindow(
        res.data.authURL,
        "naverOAuth",
        500,
        600
      ); // TODO: handle case where popup doesn't show (Ex: user blocked popups)

      if (oAuthPopUpWindow) {
        onOpenPopUpWindow(oAuthPopUpWindow);
      }
    }
  };

  return (
    <StyledNaverSignInButton type="button" onClick={onNaverSignIn}>
      <img src={naverLogo} alt="네이버 로고" />
      <p>네이버 로그인</p>
    </StyledNaverSignInButton>
  );
}

const StyledNaverSignInButton = styled(BaseSignInButton)`
  background-color: #02bd34;
  color: ${designSystem.color.neutral.white};
  font: ${designSystem.font.button2};
`;
