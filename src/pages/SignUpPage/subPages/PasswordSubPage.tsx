import useText from "@components/hooks/useText";
import { validatePassword } from "@utils/authInputValidators";
import SubPage from "./SubPage";

type Props = {
  onNext: (password: string, passwordConfirm: string) => void;
};

export default function PasswordSubPage({ onNext }: Props) {
  const {
    value: password,
    isError: isPasswordError,
    onChange: onPasswordChange,
  } = useText({
    validators: [validatePassword],
  });

  const {
    value: passwordConfirm,
    isError: isPasswordConfirmError,
    onChange: onPasswordConfirmChange,
  } = useText({
    validators: [validatePassword],
  });

  const isPasswordMismatch = !isPasswordError && password !== passwordConfirm;

  return (
    <SubPage>
      <div>
        <label htmlFor="passwordInput">비밀번호</label>
        <input
          type="password"
          placeholder="비밀번호"
          id="passwordInput"
          value={password}
          onChange={(e) => onPasswordChange(e.target.value.trim())}
        />
        <p>영문, 숫자, 특수문자 최소 1개 (8~16자)</p>
      </div>

      <div>
        <label htmlFor="passwordConfirmInput">비밀번호 확인</label>
        <input
          type="password"
          placeholder="비밀번호 확인"
          id="passwordConfirmInput"
          value={passwordConfirm}
          onChange={(e) => onPasswordConfirmChange(e.target.value.trim())}
        />

        {isPasswordMismatch && <p>비밀번호가 일치하지 않습니다.</p>}
      </div>

      <button
        type="button"
        onClick={() => onNext(password, passwordConfirm)}
        disabled={
          isPasswordError ||
          isPasswordConfirmError ||
          password !== passwordConfirm
        }>
        다음
      </button>
    </SubPage>
  );
}
