import { postOAuthUrl } from "@api/auth";
import { HTTPSTATUS } from "@api/types";
import googleLogo from "@assets/icons/logo/ic_google.svg";
import { WindowContext } from "@context/WindowContext";
import designSystem from "@styles/designSystem";
import openPopUpWindow from "@utils/openPopUpWindow";
import { useContext } from "react";
import styled from "styled-components";
import { BaseSignInButton } from "./BaseSignInButton";

export default function GoogleSignInButton() {
  const { onOpenPopUpWindow } = useContext(WindowContext);

  const onGoogleSignIn = async () => {
    // Get Auth URL from server.
    const res = await postOAuthUrl("google");

    // TODO: handle error
    if (res.code === HTTPSTATUS.success) {
      const oAuthPopUpWindow = openPopUpWindow(
        res.data.authURL,
        "googleOAuth",
        500,
        600
      ); // TODO: handle case where popup doesn't show (Ex: user blocked popups)

      if (oAuthPopUpWindow) {
        onOpenPopUpWindow(oAuthPopUpWindow);
      }
    }
  };

  return (
    <StyledGoogleSignInButton onClick={onGoogleSignIn}>
      <img src={googleLogo} alt="구글 로고" />
      구글 로그인
    </StyledGoogleSignInButton>
  );
}

const StyledGoogleSignInButton = styled(BaseSignInButton)`
  border: 1px solid ${designSystem.color.neutral.gray200};
  background: ${designSystem.color.neutral.white};
  color: ${designSystem.color.neutral.gray600};
  font: ${designSystem.font.button2};
`;
