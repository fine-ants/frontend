import { CLIENT_URL, NAVER_CLIENT_ID } from "@constants/config";
import { useEffect } from "react";
import styled from "styled-components";

export default function NaverSignInButton() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const naverLogin = new (window as any).naver.LoginWithNaverId({
    clientId: NAVER_CLIENT_ID,
    callbackUrl: `${CLIENT_URL}/signin?provider=naver`,
    isPopup: true,
    loginButton: {
      color: "green",
      type: 3,
      height: 40,
    },
  });

  useEffect(() => {
    naverLogin.init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <StyledNaverSignInButton id="naverIdLogin" />;
}

const StyledNaverSignInButton = styled.div``;
