import googleLogo from "@assets/icons/logo/ic_google.svg";
import kakaoLogo from "@assets/icons/logo/ic_kakao.svg";
import naverLogo from "@assets/icons/logo/ic_naver.svg";
import { CustomTooltip } from "@components/Tooltips/CustomTooltip";
import { WindowContext } from "@context/WindowContext";
import { OAuthProvider, postOAuthUrl } from "@features/auth/api";
import { useBoolean } from "@hooks/useBoolean";
import useResponsiveLayout from "@hooks/useResponsiveLayout";
import designSystem from "@styles/designSystem";
import openPopUpWindow from "@utils/openPopUpWindow";
import { useContext, useEffect, useRef } from "react";
import { toast } from "src/main";
import styled from "styled-components";

type Variant = "rectangle" | "circle";

type Props = {
  provider: OAuthProvider;
  variant?: Variant;
};

export default function SocialLoginButton({
  provider,
  variant = "rectangle",
}: Props) {
  const { isDesktop } = useResponsiveLayout();

  const { onOpenPopUpWindow } = useContext(WindowContext);

  const { state: isTooltipOpen, setTrue: setTooltipOpen } = useBoolean();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setTooltipOpen();
    }, 300);
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let socialLoginButton = null;

  if (provider === "google") {
    socialLoginButton =
      variant === "rectangle" ? (
        <RectangleButton
          type="button"
          onClick={onSignIn}
          $provider="google"
          $isDesktop={isDesktop}>
          <img src={googleLogo} alt="구글 로고" />
          <p>구글 로그인</p>
        </RectangleButton>
      ) : (
        <CircleButton type="button" onClick={onSignIn} $provider="google">
          <img src={googleLogo} alt="구글 로고" />
        </CircleButton>
      );
  }

  if (provider === "kakao") {
    socialLoginButton =
      variant === "rectangle" ? (
        <RectangleButton
          type="button"
          onClick={onSignIn}
          $provider="kakao"
          $isDesktop={isDesktop}>
          <img src={kakaoLogo} alt="카카오 로고" />
          <p>카카오 로그인</p>
        </RectangleButton>
      ) : (
        <CircleButton type="button" onClick={onSignIn} $provider="kakao">
          <img src={kakaoLogo} alt="카카오 로고" />
        </CircleButton>
      );
  }

  if (provider === "naver") {
    socialLoginButton =
      variant === "rectangle" ? (
        <RectangleButton
          type="button"
          onClick={onSignIn}
          $provider="naver"
          $isDesktop={isDesktop}>
          <img src={naverLogo} alt="네이버 로고" />
          <p>네이버 로그인</p>
        </RectangleButton>
      ) : (
        <CircleButton type="button" onClick={onSignIn} $provider="naver">
          <img src={naverLogo} alt="네이버 로고" />
        </CircleButton>
      );
  }

  return recentlyLoggedInMethod === provider
    ? socialLoginButton && (
        <CustomTooltip
          title="최근 사용한 로그인 방법입니다"
          open={isTooltipOpen}
          placement="top">
          {socialLoginButton}
        </CustomTooltip>
      )
    : socialLoginButton;
}

const oAuthProviderToCSS = {
  google: `
    background-color: ${designSystem.color.neutral.white};
    border: 1px solid ${designSystem.color.neutral.gray200};
    font: ${designSystem.font.button2.font};
    letter-spacing: ${designSystem.font.button2.letterSpacing};
    color: ${designSystem.color.neutral.gray600};
  `,
  kakao: `
    background-color: ${designSystem.color.kakao.primary};
    border: 1px solid ${designSystem.color.kakao.primary};
    font: ${designSystem.font.button2.font};
    letter-spacing: ${designSystem.font.button2.letterSpacing};
    color: ${designSystem.color.neutral.black};
  `,
  naver: `
    background-color: ${designSystem.color.naver.primary};
    border: 1px solid ${designSystem.color.naver.primary};
    font: ${designSystem.font.button2.font};
    letter-spacing: ${designSystem.font.button2.letterSpacing};
    color: ${designSystem.color.neutral.white};
  `,
};

const RectangleButton = styled.button<{
  $provider: OAuthProvider;
  $isDesktop: boolean;
}>`
  height: ${({ $isDesktop }) => ($isDesktop ? "44px" : "48px")};
  padding: 0px 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  flex-grow: 1;
  flex-shrink: 0;
  border-radius: 4px;
  ${({ $provider }) => oAuthProviderToCSS[$provider]};
`;

const CircleButton = styled.button<{ $provider: OAuthProvider }>`
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: none;
  border-radius: 50%;
  ${({ $provider }) => oAuthProviderToCSS[$provider]};
`;
