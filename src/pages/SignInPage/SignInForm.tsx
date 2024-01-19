import useOAuthSignInMutation from "@api/auth/queries/useOAuthSignInMutation";
import useSignInMutation from "@api/auth/queries/useSignInMutation";
import {
  AuthPageHeader,
  AuthPageTitle,
  AuthPageTitleCaption,
} from "@components/auth/AuthPageCommon";
import SocialLoginButton from "@components/auth/SocialLoginButton";
import CheckBox from "@components/common/Checkbox/Checkbox";
import { PasswordTextField } from "@components/common/TextField/PasswordTextField";
import { TextField } from "@components/common/TextField/TextField";
import { CLIENT_URL } from "@constants/config";
import { WindowContext } from "@context/WindowContext";
import { useText, validateEmail } from "@fineants/demolition";
import { Button } from "@mui/material";
import Routes from "@router/Routes";
import designSystem from "@styles/designSystem";
import { FormEvent, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const emailValidator = (email: string) =>
  validateEmail(email, { errorMessage: "올바른 이메일을 입력해주세요" });

export default function SignInForm() {
  const navigate = useNavigate();
  const { popUpWindow, closePopUpWindow } = useContext(WindowContext);

  const { mutate: signInMutate } = useSignInMutation();
  const { mutateAsync: oAuthSignInMutate } = useOAuthSignInMutation();

  const {
    value: email,
    error: emailError,
    onChange: onEmailChange,
  } = useText({
    validators: [emailValidator],
  });
  const {
    value: password,
    error: passwordError,
    onChange: onPasswordChange,
  } = useText();

  const onEmailClear = () => {
    onEmailChange("");
  };

  const onSignInSubmit = async (e: FormEvent) => {
    e.preventDefault();
    signInMutate({ email, password });
  };

  // Receive OAuth provider, auth code, state in original window from popup window.
  // Only used by Kakao and Naver Login.
  useEffect(() => {
    if (!popUpWindow) return;

    let shouldClosePopUp = false;

    const closePopUpMessageHandler = async (e: MessageEvent) => {
      if (e.origin === CLIENT_URL) {
        const { provider, authCode, state } = e.data;

        if (provider && authCode && state) {
          await oAuthSignInMutate({ provider, authCode, state });
        }
      }
      shouldClosePopUp = true;
    };

    window.addEventListener("message", closePopUpMessageHandler);

    return () => {
      window.removeEventListener("message", closePopUpMessageHandler);

      if (shouldClosePopUp) {
        closePopUpWindow(); // redirect를 통한 component unmount에 의존
      }
    };
  }, [closePopUpWindow, oAuthSignInMutate, popUpWindow]);

  const isAllFieldsFilled = !!email && !emailError && !!password;

  return (
    <SignInContainer>
      <AuthPageHeader>
        <AuthPageTitle>로그인</AuthPageTitle>
        <AuthPageTitleCaption>
          이메일 또는 소셜 계정으로 로그인하세요
        </AuthPageTitleCaption>
      </AuthPageHeader>
      <Form onSubmit={onSignInSubmit}>
        <InputControl>
          <TextInputLabel>이메일</TextInputLabel>
          <TextField
            error={!!emailError}
            placeholder="이메일"
            value={email}
            errorText={emailError}
            onChange={(e) => onEmailChange(e.target.value.trim())}
            clearValue={onEmailClear}
          />
        </InputControl>
        <InputControl>
          <TextInputLabel>비밀번호</TextInputLabel>
          <PasswordTextField
            placeholder="비밀번호를 입력해주세요"
            password={password}
            onChange={(e) => onPasswordChange(e.target.value.trim())}
          />
          {passwordError && <TextInputError>{passwordError}</TextInputError>}
          <SupportContainer>
            <FormControlLabel>
              <CheckBox size="h20" />내 정보 기억하기
            </FormControlLabel>
            <TextButton>비밀번호를 잊으셨나요?</TextButton>
          </SupportContainer>
        </InputControl>

        <SignInButton type="submit" disabled={!isAllFieldsFilled}>
          로그인
        </SignInButton>
      </Form>

      <SignInButtonContainer>
        <SocialLoginButton provider="google" />
        <SocialLoginButton provider="kakao" />
        <SocialLoginButton provider="naver" />
      </SignInButtonContainer>
      <SignUpWrapper>
        아직 계정이 없으신가요?
        <SignUpButton type="button" onClick={() => navigate(Routes.SIGNUP)}>
          회원가입하기
        </SignUpButton>
      </SignUpWrapper>
    </SignInContainer>
  );
}

const SignInContainer = styled.div`
  width: 720px;
  height: 100%;
  padding: 0 80px;
  display: flex;
  flex-direction: column;
  gap: 48px;

  > h2 {
    font-size: 42px;
    font-weight: bold;
  }
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
`;

const InputControl = styled.div`
  width: 560px;
  margin-bottom: 8px;
  display: flex;
  flex-direction: column;
`;

const TextInputLabel = styled.label`
  width: 100%;
  margin-bottom: 12px;
  display: block;
  font: ${designSystem.font.title5.font};
  letter-spacing: ${designSystem.font.title5.letterSpacing};
  color: ${designSystem.color.neutral.gray800};
`;

const TextInputError = styled.p`
  height: 18px;
  font: ${designSystem.font.body4.font};
  color: ${designSystem.color.state.red};
`;

const SupportContainer = styled.div`
  width: 100%;
  margin-top: 17.5px;
  display: flex;
  justify-content: space-between;
`;

const TextButton = styled(Button)`
  font: ${designSystem.font.button2.font};
  letter-spacing: ${designSystem.font.button2.letterSpacing};
  color: ${designSystem.color.neutral.gray600};
`;

const FormControlLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SignInButtonContainer = styled.div`
  width: 100%;
  padding: 16px 0;
  display: flex;
  gap: 8px;

  button {
    flex: 1;
  }
`;

const SignInButton = styled.button`
  display: flex;
  width: 100%;
  min-width: 128px;
  height: 44px;
  padding: 0px 16px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
  background: ${designSystem.color.primary.blue500};
  border-radius: 4px;
  font: ${designSystem.font.button1.font};
  letter-spacing: ${designSystem.font.button1.letterSpacing};
  color: ${designSystem.color.neutral.white};

  &:disabled {
    background: ${designSystem.color.primary.blue200};
  }
`;

const SignUpButton = styled.button`
  font: ${designSystem.font.button2.font};
  letter-spacing: ${designSystem.font.button2.letterSpacing};
  color: ${designSystem.color.primary.blue500};
`;

const SignUpWrapper = styled.div`
  display: flex;
  gap: 6px;
  font: ${designSystem.font.body3.font};
  color: ${designSystem.color.neutral.gray600};
`;
