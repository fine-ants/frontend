import { getOAuthURL } from "@api/auth";
import { HTTPSTATUS } from "@api/types";
import kakaoLoginButtonImage from "@assets/images/kakao_login_medium_wide.png";
import { WindowContext } from "@context/WindowContext";
import openPopUpWindow from "@utils/openPopUpWindow";
import { useContext } from "react";
import { styled } from "styled-components";

export default function KakaoSignInButton() {
  const { onOpenPopUpWindow } = useContext(WindowContext);

  const onKakaoSignIn = async () => {
    // Get Auth URL from server.
    const res = await getOAuthURL("kakao");

    // TODO: handle error
    if (res.code === HTTPSTATUS.success) {
      const oAuthPopUpWindow = openPopUpWindow(
        res.data.url,
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
      <img src={kakaoLoginButtonImage} alt="카카오 로그인" />
    </StyledKakaoSignInButton>
  );
}

const StyledKakaoSignInButton = styled.button`
  width: 228px;
  height: 44px;

  img {
    width: 100%;
    object-fit: fill;
  }
`;
