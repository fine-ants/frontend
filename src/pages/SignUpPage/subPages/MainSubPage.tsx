import {
  AuthPageHeader,
  AuthPageTitle,
  AuthPageTitleCaption,
} from "@components/auth/AuthPageCommon";
import SocialLoginButton from "@components/auth/SocialLoginButton";
import designSystem from "@styles/designSystem";
import styled from "styled-components";
import SubPage from "./SubPage";

type Props = {
  onNext: () => void;
};

export default function MainSubPage({ onNext }: Props) {
  return (
    <StyledMainSubPage>
      <AuthPageHeader>
        <AuthPageTitle>회원가입</AuthPageTitle>
        <AuthPageTitleCaption>
          환영합니다! 이메일로 가입하거나 소셜 계정으로 시작하세요
        </AuthPageTitleCaption>
      </AuthPageHeader>
      <ButtonContainer>
        <EmailSignInButton type="button" onClick={onNext}>
          이메일로 가입하기
        </EmailSignInButton>
        <span>또는</span>
        <OAuthButtonContainer>
          <SocialLoginButton provider="google" />
          <SocialLoginButton provider="kakao" />
          <SocialLoginButton provider="naver" />
        </OAuthButtonContainer>
      </ButtonContainer>
    </StyledMainSubPage>
  );
}

const StyledMainSubPage = styled(SubPage)`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 444px;
  gap: 48px !important;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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

const EmailSignInButton = styled.button`
  width: 100%;
  min-width: 128px;
  height: 44px;
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
