import { AuthOnPrevButton } from "@components/auth/AuthOnPrevButton";
import {
  AuthPageHeader,
  AuthPageTitle,
  AuthPageTitleCaption,
  NextButton,
} from "@components/auth/AuthPageCommon";
import { AuthPasswordInput } from "@components/auth/AuthPasswordInput";
import { useText, validatePassword } from "@fineants/demolition";
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

  const isPasswordMismatch = !isPasswordError && password !== passwordConfirm;

  return (
    <SubPage>
      <AuthPageHeader>
        <AuthOnPrevButton onPrev={onPrev} />

        <AuthPageTitle>비밀번호</AuthPageTitle>
        <AuthPageTitleCaption>
          비밀번호는 영문, 숫자, 특수문자를 1개 이상 조합한 8~16자여야 합니다
        </AuthPageTitleCaption>
      </AuthPageHeader>

      <AuthPasswordInput
        error={isPasswordError}
        password={password}
        onChange={(e) => onPasswordChange(e.target.value.trim())}
        placeholder="비밀번호"
        helperText={error}
      />

      <AuthPasswordInput
        error={isPasswordMismatch}
        password={passwordConfirm}
        onChange={(e) => onPasswordConfirmChange(e.target.value.trim())}
        placeholder="비밀번호 확인"
        helperText="비밀번호가 일치하지 않습니다"
      />

      <NextButton
        type="button"
        onClick={() => onNext(password, passwordConfirm)}
        disabled={
          isPasswordError ||
          isPasswordConfirmError ||
          password !== passwordConfirm
        }>
        다음
      </NextButton>
    </SubPage>
  );
}
