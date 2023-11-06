import useOAuthSignInMutation from "@api/auth/queries/useOAuthSignInMutation";
import useSignInMutation from "@api/auth/queries/useSignInMutation";
import GoogleSignInButton from "@components/auth/GoogleSignInButton";
import KakaoSignInButton from "@components/auth/KakaoSignInButton";
import NaverSignInButton from "@components/auth/NaverSignInButton";
import useText from "@components/hooks/useText";
import { CLIENT_URL } from "@constants/config";
import { validateEmail } from "@utils/authInputValidators";
import { WindowContext } from "context/WindowContext";
import { FormEvent, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Routes from "router/Routes";
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

  // Receive OAuth provider and auth code in the popup window from the OAuth provider and send it to the original window.
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const provider = urlParams.get("provider");
    const authCode = urlParams.get("code");

    if (provider && authCode) {
      // Send OAuth provider and auth code to original window.
      window.opener.postMessage({ provider, authCode }, CLIENT_URL);
    }
  }, []);

  // Receive OAuth provider and auth code in original window from popup window.
  useEffect(() => {
    if (!popUpWindow) return;

    const closeWindowMessageHandler = (e: MessageEvent) => {
      if (e.origin === CLIENT_URL) {
        const { provider, authCode } = e.data;
        if (provider && authCode) {
          oAuthSignInMutate({ provider, authCode });
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
    <StyledSignInPage>
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

        <button type="submit" disabled={!isAllFieldsFilled}>
          로그인
        </button>
      </Form>

      <GoogleSignInButton />
      <KakaoSignInButton />
      <NaverSignInButton />

      <button type="button" onClick={() => navigate(Routes.SIGNUP)}>
        회원가입
      </button>
    </StyledSignInPage>
  );
}

const StyledSignInPage = styled(BasePage)``;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InputControl = styled.div`
  width: 100%;
  margin-bottom: 8px;

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
