import Button from "@components/Buttons/Button";
import { TextButton } from "@components/Buttons/TextButton";
import CheckBox from "@components/Checkbox";
import { PasswordTextField } from "@components/TextField/PasswordTextField";
import { TextField } from "@components/TextField/TextField";
import useSignInMutation from "@features/auth/api/queries/useSignInMutation";
import SocialLoginButton from "@features/auth/components/SocialLoginButton";
import { useText, validateEmail } from "@fineants/demolition";
import useResponsiveLayout from "@hooks/useResponsiveLayout";
import Routes from "@router/Routes";
import designSystem from "@styles/designSystem";
import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import AuthPageHeader from "./AuthPageHeader";

const emailValidator = (email: string) =>
  validateEmail(email, { errorMessage: "올바른 이메일을 입력해주세요" });

export default function SignInForm() {
  const { isDesktop, isMobile } = useResponsiveLayout();

  const navigate = useNavigate();

  const { mutate: signInMutate } = useSignInMutation();

  const {
    value: email,
    error: emailError,
    onChange: onEmailChange,
  } = useText({
    validators: [emailValidator],
  });
  const { value: password, onChange: onPasswordChange } = useText();

  const onEmailClear = () => {
    onEmailChange("");
  };

  const onSignInSubmit = async (e: FormEvent) => {
    e.preventDefault();
    signInMutate({ email, password });
  };

  const isAllFieldsFilled = !!email && !emailError && !!password;

  return (
    <StyledSignInForm $isDesktop={isDesktop}>
      <AuthPageHeader
        title="로그인"
        subtitle="이메일 또는 소셜 계정으로 로그인하세요"
      />

      <Form onSubmit={onSignInSubmit}>
        <InputControl $isDesktop={isDesktop}>
          <TextInputLabel>이메일</TextInputLabel>
          <TextField
            type="email"
            size={isDesktop ? "h44" : "h48"}
            error={!!emailError}
            placeholder="이메일"
            value={email}
            errorText={emailError}
            onChange={(e) => onEmailChange(e.target.value.trim())}
            clearValue={onEmailClear}
          />
        </InputControl>

        <InputControl $isDesktop={isDesktop}>
          <TextInputLabel>비밀번호</TextInputLabel>
          <PasswordTextField
            size={isDesktop ? "h44" : "h48"}
            placeholder="비밀번호를 입력해주세요"
            password={password}
            onChange={(e) => onPasswordChange(e.target.value.trim())}
          />
        </InputControl>

        <SupportContainer $isDesktop={isDesktop}>
          <FormControlLabel>
            <CheckBox size="h20" />내 정보 기억하기
          </FormControlLabel>
          <TextButton color="gray" variant="underline">
            비밀번호를 잊으셨나요?
          </TextButton>
        </SupportContainer>

        <LoginButton
          variant="primary"
          size={isDesktop ? "h44" : "h48"}
          type="submit"
          disabled={!isAllFieldsFilled}>
          로그인
        </LoginButton>
      </Form>

      <SocialLoginButtons $isDesktop={isDesktop}>
        <SocialLoginButton
          provider="google"
          variant={isDesktop ? "rectangle" : "circle"}
        />
        <SocialLoginButton
          provider="kakao"
          variant={isDesktop ? "rectangle" : "circle"}
        />
        <SocialLoginButton
          provider="naver"
          variant={isDesktop ? "rectangle" : "circle"}
        />
      </SocialLoginButtons>

      <SignUpWrapper $isMobile={isMobile}>
        아직 계정이 없으신가요?
        <TextButton
          variant="underline"
          color="primary"
          onClick={() => navigate(Routes.SIGNUP)}>
          회원가입하기
        </TextButton>
      </SignUpWrapper>
    </StyledSignInForm>
  );
}

const StyledSignInForm = styled.div<{ $isDesktop: boolean }>`
  width: 100%;
  max-width: 480px;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ $isDesktop }) => ($isDesktop ? "48px" : "40px")};

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

const InputControl = styled.div<{ $isDesktop: boolean }>`
  width: 100%;
  margin-bottom: ${({ $isDesktop }) => ($isDesktop ? "24px" : "16px")};
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

const SupportContainer = styled.div<{ $isDesktop: boolean }>`
  width: 100%;
  margin-top: 16px;
  margin-bottom: ${({ $isDesktop }) => ($isDesktop ? "48px" : "40px")};
  display: flex;
  justify-content: space-between;
`;

const FormControlLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font: ${designSystem.font.button2.font};
  letter-spacing: ${designSystem.font.button2.letterSpacing};
  color: ${designSystem.color.neutral.gray600};
`;

const SocialLoginButtons = styled.div<{ $isDesktop: boolean }>`
  width: 100%;
  display: flex;
  justify-content: ${({ $isDesktop }) =>
    $isDesktop ? "space-between" : "center"};
  gap: ${({ $isDesktop }) => ($isDesktop ? "8px" : "16px")};
`;

const SignUpWrapper = styled.div<{ $isMobile: boolean }>`
  width: 100%;
  margin-top: ${({ $isMobile }) => ($isMobile ? "auto" : "0")};
  padding-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: ${({ $isMobile }) => ($isMobile ? "center" : "flex-start")};
  gap: 6px;
  font: ${designSystem.font.body3.font};
  color: ${designSystem.color.neutral.gray600};
`;

const LoginButton = styled(Button)`
  width: 100%;
`;
