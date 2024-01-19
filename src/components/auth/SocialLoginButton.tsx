import { postOAuthUrl } from "@api/auth";
import googleLogo from "@assets/icons/logo/ic_google.svg";
import kakaoLogo from "@assets/icons/logo/ic_kakao.svg";
import naverLogo from "@assets/icons/logo/ic_naver.svg";
import { createToast } from "@components/common/toast";
import { WindowContext } from "@context/WindowContext";
import designSystem from "@styles/designSystem";
import openPopUpWindow from "@utils/openPopUpWindow";
import { useContext } from "react";
import styled from "styled-components";
import { BaseSignInButton } from "./BaseSignInButton";

type Props = {
  provider: "google" | "kakao" | "naver";
};

const toast = createToast();

export default function SocialLoginButton({ provider }: Props) {
  const { onOpenPopUpWindow } = useContext(WindowContext);

  const onSignIn = async () => {
    try {
      // Get Auth URL from server.
      const res = await postOAuthUrl(provider);

      const oAuthPopUpWindow = openPopUpWindow(
        res.data.authURL,
        `${provider}OAuth`,
        500,
        600
      );

      if (oAuthPopUpWindow) {
        onOpenPopUpWindow(oAuthPopUpWindow);
      } else {
        toast.error("소셜 로그인을 위해 팝업을 허용해주세요");
      }
    } catch (_) {
      toast.error("로그인을 실패했습니다. 잠시후 재시도해주세요.");
    }
  };

  if (provider === "google") {
    return (
      <StyledGoogleSignInButton type="button" onClick={onSignIn}>
        <img src={googleLogo} alt="구글 로고" />
        <p>구글 로그인</p>
      </StyledGoogleSignInButton>
    );
  }

  if (provider === "kakao") {
    return (
      <StyledKakaoSignInButton type="button" onClick={onSignIn}>
        <img src={kakaoLogo} alt="카카오 로고" />
        <p>카카오 로그인</p>
      </StyledKakaoSignInButton>
    );
  }

  if (provider === "naver") {
    return (
      <StyledNaverSignInButton type="button" onClick={onSignIn}>
        <img src={naverLogo} alt="네이버 로고" />
        <p>네이버 로그인</p>
      </StyledNaverSignInButton>
    );
  }
}

const StyledKakaoSignInButton = styled(BaseSignInButton)`
  background-color: ${designSystem.color.kakao.primary};
  font: ${designSystem.font.button2.font};
  letter-spacing: ${designSystem.font.button2.letterSpacing};
  color: ${designSystem.color.neutral.black};
`;

const StyledGoogleSignInButton = styled(BaseSignInButton)`
  background-color: ${designSystem.color.neutral.white};
  border: 1px solid ${designSystem.color.neutral.gray200};
  font: ${designSystem.font.button2.font};
  letter-spacing: ${designSystem.font.button2.letterSpacing};
  color: ${designSystem.color.neutral.gray600};
`;

const StyledNaverSignInButton = styled(BaseSignInButton)`
  background-color: ${designSystem.color.naver.primary};
  font: ${designSystem.font.button2.font};
  letter-spacing: ${designSystem.font.button2.letterSpacing};
  color: ${designSystem.color.neutral.white};
`;
