import { CLIENT_URL } from "@constants/config";
import { CircularProgress } from "@mui/material";
import designSystem from "@styles/designSystem";
import { useEffect } from "react";
import styled from "styled-components";

export default function SignInLoadingPage() {
  // Handle Google, Kakao, Naver Redirect (receive OAuth provider, auth code and state) received in popup.
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const provider = urlParams.get("provider");
    const authCode = urlParams.get("code");
    const state = urlParams.get("state");

    if (!provider || !authCode || !state) return; // TODO: handle error

    window.opener?.postMessage({ provider, authCode, state }, CLIENT_URL);
  });

  return (
    <StyledSignInLoadingPage>
      <CircularProgress
        sx={{ color: designSystem.color.primary.blue500 }}
        size={85}
      />
      <Text>로그인 중입니다.</Text>
    </StyledSignInLoadingPage>
  );
}

const StyledSignInLoadingPage = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 32px;
`;

const Text = styled.p`
  font: ${designSystem.font.title3.font};
`;
