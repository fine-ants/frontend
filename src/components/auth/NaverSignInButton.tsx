import { postOAuthUrl } from "@api/auth";
import { HTTPSTATUS } from "@api/types";
import naverLoginButtonImg from "@assets/images/naver_login.png";
import { WindowContext } from "@context/WindowContext";
import openPopUpWindow from "@utils/openPopUpWindow";
import { useContext } from "react";
import styled from "styled-components";

export default function NaverSignInButton() {
  const { onOpenPopUpWindow } = useContext(WindowContext);

  const onNaverSignIn = async () => {
    const res = await postOAuthUrl("naver");

    const tempURL = new URL(res.data.authURL);
    tempURL.searchParams.set(
      "redirect_uri",
      "http://localhost:5173/signin?provider=naver"
    );

    if (res.code === HTTPSTATUS.success) {
      const oAuthPopUpWindow = openPopUpWindow(
        tempURL.toString(),
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
      <img src={naverLoginButtonImg} alt="네이버 로그인" />
    </StyledNaverSignInButton>
  );
}

const StyledNaverSignInButton = styled.button`
  width: 228px;
  height: 44px;

  img {
    width: 100%;
    object-fit: fill;
  }
`;
