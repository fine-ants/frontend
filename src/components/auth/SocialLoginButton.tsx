import { OAuthProvider, postOAuthUrl } from "@api/auth";
import googleLogo from "@assets/icons/logo/ic_google.svg";
import kakaoLogo from "@assets/icons/logo/ic_kakao.svg";
import naverLogo from "@assets/icons/logo/ic_naver.svg";
import { CustomTooltip } from "@components/common/CustomTooltip";
import { WindowContext } from "@context/WindowContext";
import designSystem from "@styles/designSystem";
import openPopUpWindow from "@utils/openPopUpWindow";
import { useContext, useEffect, useRef, useState } from "react";
import { toast } from "src/main";
import styled from "styled-components";

type Props = {
  provider: OAuthProvider;
};

export default function SocialLoginButton({ provider }: Props) {
  const { onOpenPopUpWindow } = useContext(WindowContext);

  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setIsTooltipOpen(true);
    }, 300);
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const recentlyLoggedInMethod = localStorage.getItem("recentlyLoggedInMethod");

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

  let socialLoginButton = null;

  if (provider === "google") {
    socialLoginButton = (
      <StyledGoogleSignInButton type="button" onClick={onSignIn}>
        <img src={googleLogo} alt="구글 로고" />
        <p>구글 로그인</p>
      </StyledGoogleSignInButton>
    );
  }

  if (provider === "kakao") {
    socialLoginButton = (
      <StyledKakaoSignInButton type="button" onClick={onSignIn}>
        <img src={kakaoLogo} alt="카카오 로고" />
        <p>카카오 로그인</p>
      </StyledKakaoSignInButton>
    );
  }

  if (provider === "naver") {
    socialLoginButton = (
      <StyledNaverSignInButton type="button" onClick={onSignIn}>
        <img src={naverLogo} alt="네이버 로고" />
        <p>네이버 로그인</p>
      </StyledNaverSignInButton>
    );
  }

  return recentlyLoggedInMethod === provider
    ? socialLoginButton && (
        <CustomTooltip
          title="최근 사용한 로그인 방법입니다"
          open={isTooltipOpen}
          placement="top"
          arrow>
          {socialLoginButton}
        </CustomTooltip>
      )
    : socialLoginButton;
}

const BaseSignInButton = styled.button`
  display: flex;
  height: 44px;
  padding: 0px 12px;
  gap: 8px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 4px;
`;

const StyledGoogleSignInButton = styled(BaseSignInButton)`
  background-color: ${designSystem.color.neutral.white};
  border: 1px solid ${designSystem.color.neutral.gray200};
  font: ${designSystem.font.button2.font};
  letter-spacing: ${designSystem.font.button2.letterSpacing};
  color: ${designSystem.color.neutral.gray600};
`;

const StyledKakaoSignInButton = styled(BaseSignInButton)`
  background-color: ${designSystem.color.kakao.primary};
  border: 1px solid ${designSystem.color.kakao.primary};
  font: ${designSystem.font.button2.font};
  letter-spacing: ${designSystem.font.button2.letterSpacing};
  color: ${designSystem.color.neutral.black};
`;

const StyledNaverSignInButton = styled(BaseSignInButton)`
  background-color: ${designSystem.color.naver.primary};
  border: 1px solid ${designSystem.color.naver.primary};
  font: ${designSystem.font.button2.font};
  letter-spacing: ${designSystem.font.button2.letterSpacing};
  color: ${designSystem.color.neutral.white};
`;
