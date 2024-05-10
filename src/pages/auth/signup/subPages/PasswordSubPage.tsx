import { PasswordTextField } from "@components/TextField/PasswordTextField";
import { AuthOnPrevButton } from "@features/auth/components/AuthOnPrevButton";
import AuthPageHeaderD from "@features/auth/components/AuthPageHeader/desktop/AuthPageHeaderD";
import AuthPageHeaderM from "@features/auth/components/AuthPageHeader/mobile/AuthPageHeaderM";
import { useText, validatePassword } from "@fineants/demolition";
import useResponsiveLayout from "@hooks/useResponsiveLayout";
import { FormEvent } from "react";
import styled from "styled-components";
import SubPage from "./SubPage";
import {
  AuthNextButton,
  AuthPageHeaderInnerWrapperD,
  AuthPageHeaderInnerWrapperM,
  AuthPageHeaderMWrapper,
  PrevButtonWrapperM,
} from "./common";

type Props = {
  onPrev: () => void;
  onNext: (password: string, passwordConfirm: string) => void;
};

const passwordValidator = (password: string) =>
  validatePassword(password, {
    errorMessage: "영문, 숫자, 특수문자 최소 1개 (8~16자)",
  });

export default function PasswordSubPage({ onPrev, onNext }: Props) {
  const { isDesktop, isMobile } = useResponsiveLayout();

  const {
    value: password,
    isError: isPasswordError,
    error,
    onChange: onPasswordChange,
  } = useText({
    validators: [passwordValidator],
  });

  const {
    value: passwordConfirm,
    isError: isPasswordConfirmError,
    onChange: onPasswordConfirmChange,
  } = useText({
    validators: [passwordValidator],
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    onNext(password, passwordConfirm);
  };

  const isPasswordMismatch = password !== passwordConfirm;

  const isButtonDisabled =
    isPasswordError ||
    isPasswordConfirmError ||
    password !== passwordConfirm ||
    password === "";

  return (
    <SubPage>
      {isDesktop && (
        <AuthPageHeaderInnerWrapperD>
          <AuthOnPrevButton onPrev={onPrev} />
          <AuthPageHeaderD
            title="비밀번호 생성"
            subtitle="비밀번호는 영문, 숫자, 특수문자를 1개 이상 조합한 8~16자여야 합니다"
          />
        </AuthPageHeaderInnerWrapperD>
      )}
      {isMobile && (
        <AuthPageHeaderMWrapper>
          <PrevButtonWrapperM>
            <AuthOnPrevButton onPrev={onPrev} />
          </PrevButtonWrapperM>
          <AuthPageHeaderInnerWrapperM>
            <AuthPageHeaderM
              title="비밀번호 생성"
              subtitle="비밀번호는 영문, 숫자, 특수문자를 1개 이상 조합한 8~16자여야 합니다"
            />
          </AuthPageHeaderInnerWrapperM>
        </AuthPageHeaderMWrapper>
      )}

      <Form onSubmit={onSubmit} $isMobile={isMobile}>
        <TextFieldsWrapper>
          <PasswordTextField
            size={isMobile ? "h48" : "h44"}
            error={isPasswordError && password !== ""}
            password={password}
            onChange={(e) => onPasswordChange(e.target.value.trim())}
            placeholder="비밀번호"
            errorText={error}
          />

          <PasswordTextField
            size={isMobile ? "h48" : "h44"}
            error={isPasswordMismatch && passwordConfirm !== ""}
            password={passwordConfirm}
            onChange={(e) => onPasswordConfirmChange(e.target.value.trim())}
            placeholder="비밀번호 확인"
            errorText="비밀번호가 일치하지 않습니다"
          />
        </TextFieldsWrapper>

        <AuthNextButton
          variant="primary"
          size={isMobile ? "h48" : "h44"}
          type="submit"
          disabled={isButtonDisabled}
          $isMobile={isMobile}>
          다음
        </AuthNextButton>
      </Form>
    </SubPage>
  );
}

const Form = styled.form<{ $isMobile: boolean }>`
  width: 100%;
  max-width: 480px;
  height: 100%;
  padding-inline: ${({ $isMobile }) => ($isMobile ? "16px" : "0")};
  display: flex;
  flex-direction: column;
  gap: 58px;
  align-self: center;
`;

const TextFieldsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 42px;
`;
