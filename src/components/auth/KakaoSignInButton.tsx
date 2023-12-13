import { postOAuthUrl } from "@api/auth";
import { HTTPSTATUS } from "@api/types";
import kakaoLogo from "@assets/images/kakao_logo.svg";
import { WindowContext } from "@context/WindowContext";
import designSystem from "@styles/designSystem";
import openPopUpWindow from "@utils/openPopUpWindow";
import { useContext } from "react";
import styled from "styled-components";
import { BaseSignInButton } from "./BaseSignInButton";

export default function KakaoSignInButton() {
  const { onOpenPopUpWindow } = useContext(WindowContext);

  const onKakaoSignIn = async () => {
    // Get Auth URL from server.
    const res = await postOAuthUrl("kakao");

    // This is for development. Remove this.
    const tempURL = new URL(res.data.authURL);
    tempURL.searchParams.set(
      "redirect_uri",
      "http://localhost:5173/signin?provider=kakao"
    );
    const url =
      process.env.NODE_ENV === "development"
        ? tempURL.toString()
        : res.data.authURL;

    // TODO: handle error
    if (res.code === HTTPSTATUS.success) {
      const oAuthPopUpWindow = openPopUpWindow(
        url, // This is for development. Change this to res.data.authURL.
        "kakaoOAuth",
        500,
        600
      ); // TODO: handle case where popup doesn't show (Ex: user blocked popups)

      if (oAuthPopUpWindow) {
        onOpenPopUpWindow(oAuthPopUpWindow);
      }
    }
  };

  return (
    <StyledKakaoSignInButton type="button" onClick={onKakaoSignIn}>
      {/* <img src={kakaoLoginButtonImage} alt="카카오 로그인" /> */}
      <img src={kakaoLogo} alt="카카오 로고" />
      <p>카카오 로그인</p>
    </StyledKakaoSignInButton>
  );
}

const StyledKakaoSignInButton = styled(BaseSignInButton)`
  background: ${designSystem.color.kakao.primary};
  color: ${designSystem.color.neutral.black};
  font: ${designSystem.font.button2};
`;
