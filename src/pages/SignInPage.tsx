import useOAuthSignInMutation from "@api/auth/queries/useOAuthSignInMutation";
import useSignInMutation from "@api/auth/queries/useSignInMutation";
import {
  AuthPageHeader,
  AuthPageTitle,
  AuthPageTitleCaption,
} from "@components/auth/AuthPageCommon";
import GoogleSignInButton from "@components/auth/GoogleSignInButton";
import KakaoSignInButton from "@components/auth/KakaoSignInButton";
import NaverSignInButton from "@components/auth/NaverSignInButton";
import CheckBox from "@components/common/Checkbox/Checkbox";
import useText from "@components/hooks/useText";
import { CLIENT_URL } from "@constants/config";
import { WindowContext } from "@context/WindowContext";
import { Button, FormControlLabel } from "@mui/material";
import Routes from "@router/Routes";
import designSystem from "@styles/designSystem";
import { validateEmail } from "@utils/authInputValidators";
import { FormEvent, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthInput } from "../components/auth/AuthInput";
import { AuthPasswordInput } from "../components/auth/AuthPasswordInput";
import BasePage from "./BasePage";

export default function SignInPage() {
  const navigate = useNavigate();
  const { popUpWindow, closePopUpWindow } = useContext(WindowContext);

  const { mutate: signInMutate } = useSignInMutation();
  const { mutateAsync: oAuthSignInMutate } = useOAuthSignInMutation();

  const {
    value: email,
    error: emailError,
    onChange: onEmailChange,
  } = useText({ validators: [validateEmail] });
  const {
    value: password,
    error: passwordError,
    onChange: onPasswordChange,
  } = useText();

  const onSignInSubmit = async (e: FormEvent) => {
    e.preventDefault();
    signInMutate({ email, password });
  };

  // Handle Google, Kakao, Naver Redirect (receive OAuth provider, auth code and state) received in popup.
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const provider = urlParams.get("provider");
    const authCode = urlParams.get("code");
    const state = urlParams.get("state");

    if (!provider || !authCode || !state) return; // TODO: handle error

    // Received data in the popup window from the OAuth provider and send it to the original window.
    if (provider === "google" || provider === "kakao" || provider === "naver") {
      // Send OAuth provider, auth code and state to the original window.
      window.opener.postMessage({ provider, authCode, state }, CLIENT_URL);
    }
  }, [oAuthSignInMutate]);

  // Receive OAuth provider, auth code, state in original window from popup window.
  // Only used by Kakao and Naver Login.
  useEffect(() => {
    if (!popUpWindow) return;

    const closeWindowMessageHandler = async (e: MessageEvent) => {
      if (e.origin === CLIENT_URL) {
        const { provider, authCode, state } = e.data;

        if (provider && authCode && state) {
          await oAuthSignInMutate({ provider, authCode, state });
        }
        // closePopUpWindow();
      }
    };

    window.addEventListener("message", closeWindowMessageHandler);

    return () => {
      window.removeEventListener("message", closeWindowMessageHandler);
    };
  }, [closePopUpWindow, oAuthSignInMutate, popUpWindow]);

  const isAllFieldsFilled = !!email && !emailError && !!password;

  return (
    <BasePage>
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
            <AuthInput
              error={!!emailError}
              type="text"
              placeholder="이메일"
              value={email}
              onChange={(e) => onEmailChange(e.target.value.trim())}
              helperText={emailError}
            />
          </InputControl>
          <InputControl>
            <TextInputLabel>비밀번호</TextInputLabel>
            <AuthPasswordInput
              password={password}
              onChange={(e) => onPasswordChange(e.target.value.trim())}
            />
            {passwordError && <TextInputError>{passwordError}</TextInputError>}
            <SupportContainer>
              <FormControlLabel
                control={<CheckBox size="h20" />}
                label="내 정보 기억하기"
              />
              <TextButton>비밀번호를 잊으셨나요?</TextButton>
            </SupportContainer>
          </InputControl>

          <SignInButton type="submit" disabled={!isAllFieldsFilled}>
            로그인
          </SignInButton>
        </Form>

        <SignInButtonContainer>
          <GoogleSignInButton />
          <KakaoSignInButton />
          <NaverSignInButton />
        </SignInButtonContainer>
        <SignUpWrapper>
          아직 계정이 없으신가요?
          <SignUpButton type="button" onClick={() => navigate(Routes.SIGNUP)}>
            회원가입하기
          </SignUpButton>
        </SignUpWrapper>
      </SignInContainer>
    </BasePage>
  );
}

const SignInContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  width: 720px;
  height: 100%;
  padding: 0 80px;
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
  display: block;
  color: ${designSystem.color.neutral.gray800};
  font: ${designSystem.font.title5};
  margin-bottom: 12px;
`;

const TextInputError = styled.p`
  height: 18px;
  color: ${designSystem.color.state.red};
  font: ${designSystem.font.body4};
`;

const SupportContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 17.5px;
`;

const TextButton = styled(Button)`
  color: ${designSystem.color.neutral.gray600};
  font: ${designSystem.font.button2};
`;

const SignInButtonContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;
  padding: 16px 0;

  button {
    flex: 1;
  }
`;

const SignInButton = styled.button`
  display: flex;
  width: 100%;
  height: 44px;
  min-width: 128px;
  padding: 0px 16px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
  border-radius: 4px;
  background: ${designSystem.color.primary.blue500};
  color: ${designSystem.color.neutral.white};
  font: ${designSystem.font.button1};

  &:disabled {
    background: ${designSystem.color.primary.blue200};
  }
`;

const SignUpButton = styled.button`
  color: ${designSystem.color.primary.blue500};
  font: ${designSystem.font.button2};
`;

const SignUpWrapper = styled.div`
  display: flex;
  gap: 6px;
  color: ${designSystem.color.neutral.gray600};
  font: ${designSystem.font.body3};
`;
