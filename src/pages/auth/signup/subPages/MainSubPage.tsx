import { AuthOnPrevButton } from "@features/auth/components/AuthOnPrevButton";
import AuthPageHeader from "@features/auth/components/AuthPageHeader";
import SocialLoginButton from "@features/auth/components/SocialLoginButton";
import useResponsiveLayout from "@hooks/useResponsiveLayout";
import designSystem from "@styles/designSystem";
import styled from "styled-components";
import SubPage from "./SubPage";
import {
  AuthPageHeaderInnerWrapperD,
  AuthPageHeaderInnerWrapperM,
  AuthPageHeaderWrapperM,
  PrevButtonWrapperM,
} from "./common";

type Props = {
  onNext: () => void;
  onPrev: () => void;
};

export default function MainSubPage({ onNext, onPrev }: Props) {
  const { isDesktop, isMobile } = useResponsiveLayout();

  return (
    <StyledMainSubPage $isDesktop={isDesktop}>
      {isDesktop && (
        <AuthPageHeaderInnerWrapperD>
          <AuthPageHeader
            title="회원가입"
            subtitle="환영합니다! 이메일로 가입하거나 소셜 계정으로 시작하세요"
          />
        </AuthPageHeaderInnerWrapperD>
      )}
      {isMobile && (
        <AuthPageHeaderWrapperM>
          <PrevButtonWrapperM>
            <AuthOnPrevButton onPrev={onPrev} />
          </PrevButtonWrapperM>
          <AuthPageHeaderInnerWrapperM>
            <AuthPageHeader
              title="회원가입"
              subtitle="환영합니다! 이메일로 가입하거나 소셜 계정으로 시작하세요"
            />
          </AuthPageHeaderInnerWrapperM>
        </AuthPageHeaderWrapperM>
      )}

      <ButtonsContainer $isMobile={isMobile}>
        <EmailSignInButton
          type="button"
          onClick={onNext}
          $isDesktop={isDesktop}>
          이메일로 가입하기
        </EmailSignInButton>
        <span>또는</span>
        <OAuthButtonContainer>
          <SocialLoginButton provider="google" />
          <SocialLoginButton provider="kakao" />
          <SocialLoginButton provider="naver" />
        </OAuthButtonContainer>
      </ButtonsContainer>
    </StyledMainSubPage>
  );
}

const StyledMainSubPage = styled(SubPage)<{ $isDesktop: boolean }>`
  margin-top: ${({ $isDesktop }) => ($isDesktop ? "156px" : "0")};
`;

const ButtonsContainer = styled.div<{ $isMobile: boolean }>`
  width: 100%;
  max-width: 480px;
  padding-inline: ${({ $isMobile }) => ($isMobile ? "16px" : "0")};
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  gap: 24px;
  font: ${designSystem.font.body3.font};
  color: ${designSystem.color.neutral.gray600};
`;

const OAuthButtonContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const EmailSignInButton = styled.button<{ $isDesktop: boolean }>`
  width: 100%;
  min-width: 128px;
  height: ${({ $isDesktop }) => ($isDesktop ? "44px" : "48px")};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
  background: ${designSystem.color.neutral.white};
  border: 1px solid ${designSystem.color.primary.blue500};
  border-radius: 4px;
  font: ${designSystem.font.button1.font};
  letter-spacing: ${designSystem.font.button1.letterSpacing};
  color: ${designSystem.color.primary.blue500};
`;
