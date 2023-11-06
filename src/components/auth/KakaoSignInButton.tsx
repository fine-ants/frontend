import kakaoLoginButtonImage from "@assets/images/kakao_login_medium_wide.png";
import { CLIENT_URL, KAKAO_CLIENT_ID } from "@constants/config";
import { WindowContext } from "@context/WindowContext";
import openPopUpWindow from "@utils/openPopUpWindow";
import { useContext } from "react";
import { styled } from "styled-components";

export default function KakaoSignInButton() {
  const { onOpenPopUpWindow } = useContext(WindowContext);

  const onKakaoSignIn = () => {
    const oAuthPopUpWindow = openPopUpWindow(
      `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${CLIENT_URL}/signin?provider=kakao`,
      "kakaoOAuth",
      500,
      600
    ); // TODO: handle case where popup doesn't show (Ex: user blocked popups)

    if (oAuthPopUpWindow) {
      onOpenPopUpWindow(oAuthPopUpWindow);
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
