import { AuthOnPrevButton } from "@components/auth/AuthOnPrevButton";
import {
  AuthPageHeader,
  AuthPageTitle,
  AuthPageTitleCaption,
} from "@components/auth/AuthPageCommon";
import Button from "@components/common/Buttons/Button";
import { PasswordTextField } from "@components/common/TextField/PasswordTextField";
import { useText, validatePassword } from "@fineants/demolition";
import { FormEvent } from "react";
import styled from "styled-components";
import SubPage from "./SubPage";

type Props = {
  onPrev: () => void;
  onNext: (password: string, passwordConfirm: string) => void;
};

const passwordValidator = (password: string) =>
  validatePassword(password, {
    errorMessage: "영문, 숫자, 특수문자 최소 1개 (8~16자)",
  });

export default function PasswordSubPage({ onPrev, onNext }: Props) {
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
      <AuthPageHeader>
        <AuthOnPrevButton onPrev={onPrev} />

        <AuthPageTitle>비밀번호</AuthPageTitle>
        <AuthPageTitleCaption>
          비밀번호는 영문, 숫자, 특수문자를 1개 이상 조합한 8~16자여야 합니다
        </AuthPageTitleCaption>
      </AuthPageHeader>

      <Form onSubmit={onSubmit}>
        <TextFieldsWrapper>
          <PasswordTextField
            error={isPasswordError && password !== ""}
            password={password}
            onChange={(e) => onPasswordChange(e.target.value.trim())}
            placeholder="비밀번호"
            errorText={error}
          />

          <PasswordTextField
            error={isPasswordMismatch && passwordConfirm !== ""}
            password={passwordConfirm}
            onChange={(e) => onPasswordConfirmChange(e.target.value.trim())}
            placeholder="비밀번호 확인"
            errorText="비밀번호가 일치하지 않습니다"
          />
        </TextFieldsWrapper>

        <Button
          variant="primary"
          size="h44"
          type="submit"
          disabled={isButtonDisabled}>
          다음
        </Button>
      </Form>
    </SubPage>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 58px;
`;

const TextFieldsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 42px;
`;
