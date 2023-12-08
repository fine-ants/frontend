import useOAuthSignInMutation from "@api/auth/queries/useOAuthSignInMutation";
import useSignInMutation from "@api/auth/queries/useSignInMutation";
import GoogleSignInButton from "@components/auth/GoogleSignInButton";
import KakaoSignInButton from "@components/auth/KakaoSignInButton";
import NaverSignInButton from "@components/auth/NaverSignInButton";
import useText from "@components/hooks/useText";
import { CLIENT_URL } from "@constants/config";
import { WindowContext } from "@context/WindowContext";
import Routes from "@router/Routes";
import { validateEmail } from "@utils/authInputValidators";
import { FormEvent, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import BasePage from "./BasePage";

export default function SignInPage() {
  const navigate = useNavigate();
  const { popUpWindow, closePopUpWindow } = useContext(WindowContext);

  const { mutate: signInMutate } = useSignInMutation();
  const { mutate: oAuthSignInMutate } = useOAuthSignInMutation();

  const {
    value: email,
    error: emailError,
    onChange: onEmailChange,
  } = useText({ validators: [validateEmail] });
  const { value: password, onChange: onPasswordChange } = useText();

  const onSignInSubmit = async (e: FormEvent) => {
    e.preventDefault();
    signInMutate({ email, password });
  };

  // Handle Google Redirect
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const provider = urlParams.get("provider");
    const authCode = urlParams.get("code");
    const state = urlParams.get("state");

    if (!provider || !authCode || !state) return; // TODO: handle error

    if (provider === "google") {
      oAuthSignInMutate({ provider, authCode, state });
      return;
    }
  }, [oAuthSignInMutate]);

  // Handle Kakao, Naver Redirect (receive OAuth provider, auth code and state) received in popup.
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const provider = urlParams.get("provider");
    const authCode = urlParams.get("code");
    const state = urlParams.get("state");

    if (!provider || !authCode || !state) return; // TODO: handle error

    // Received data in the popup window from the OAuth provider and send it to the original window.
    if (provider === "kakao" || provider === "naver") {
      // Send OAuth provider, auth code and state to the original window.
      window.opener.postMessage({ provider, authCode, state }, CLIENT_URL);
    }
  }, [oAuthSignInMutate]);

  // Receive OAuth provider, auth code, state in original window from popup window.
  // Only used by Kakao and Naver Login.
  useEffect(() => {
    if (!popUpWindow) return;

    const closeWindowMessageHandler = (e: MessageEvent) => {
      if (e.origin === CLIENT_URL) {
        const { provider, authCode, state } = e.data;

        if (provider && authCode && state) {
          oAuthSignInMutate({ provider, authCode, state });
        }
        closePopUpWindow();
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
        <h2>로그인</h2>

        <Form onSubmit={onSignInSubmit}>
          <InputControl>
            <TextInputLabel>이메일</TextInputLabel>
            <input
              type="text"
              placeholder="이메일"
              value={email}
              onChange={(e) => onEmailChange(e.target.value.trim())}
            />
            <TextInputError>{emailError}</TextInputError>
          </InputControl>
          <InputControl>
            <TextInputLabel>비밀번호</TextInputLabel>
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => onPasswordChange(e.target.value.trim())}
            />
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
        <SignUpButton type="button" onClick={() => navigate(Routes.SIGNUP)}>
          회원가입
        </SignUpButton>
      </SignInContainer>
    </BasePage>
  );
}

const SignInContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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
`;

const InputControl = styled.div`
  width: 560px;
  margin-bottom: 8px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  > input {
    padding: 12px;
    box-sizing: border-box;
    width: 100%;
    height: 48px;
    border-radius: 8px;
    background-color: #dedee0;
  }

  &:last-of-type {
    margin-bottom: 40px;
  }
`;

const TextInputLabel = styled.label`
  width: 100%;
  display: block;
`;

const TextInputError = styled.p`
  height: 18px;
`;

const SignInButtonContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;
  padding: 16px 0;
  border-bottom: 1px solid #dedee0;
`;

const SignInButton = styled.button`
  width: 120px;
  height: 48px;
  background-color: #2d3bae;
  border-radius: 8px;
  color: white;
`;

const SignUpButton = styled.button`
  font-size: 16px;
  font-weight: bold;
  color: #2d3bae;
`;
