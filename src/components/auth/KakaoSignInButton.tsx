import { postOAuthUrl } from "@api/auth";
import { HTTPSTATUS } from "@api/types";
import kakaoLogo from "@assets/icons/logo/ic_kakao.svg";
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

    // TODO: handle error
    if (res.code === HTTPSTATUS.success) {
      const oAuthPopUpWindow = openPopUpWindow(
        res.data.authURL,
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
