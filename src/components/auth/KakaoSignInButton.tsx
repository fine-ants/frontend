import { postOAuthUrl } from "@api/auth";
import { HTTPSTATUS } from "@api/types";
import kakaoLoginButtonImage from "@assets/images/kakao_login_medium_wide.png";
import { WindowContext } from "@context/WindowContext";
import openPopUpWindow from "@utils/openPopUpWindow";
import { useContext } from "react";
import styled from "styled-components";

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
