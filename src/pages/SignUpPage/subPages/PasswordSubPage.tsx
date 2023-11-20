import useText from "@components/hooks/useText";
import { validatePassword } from "@utils/authInputValidators";
import styled from "styled-components";
import SubPage, { InputWrapper, SignUpInput } from "./SubPage";

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
      <label htmlFor="passwordInput">비밀번호</label>
      <InputWrapper>
        <PasswordInput
          type="password"
          placeholder="비밀번호"
          id="passwordInput"
          value={password}
          onChange={(e) => onPasswordChange(e.target.value.trim())}
        />
      </InputWrapper>

      <Caption>영문, 숫자, 특수문자 최소 1개 (8~16자)</Caption>

      <label htmlFor="passwordConfirmInput">비밀번호 확인</label>
      <InputWrapper>
        <PasswordInput
          type="password"
          placeholder="비밀번호 확인"
          id="passwordConfirmInput"
          value={passwordConfirm}
          onChange={(e) => onPasswordConfirmChange(e.target.value.trim())}
        />

        {isPasswordMismatch && <Caption>비밀번호가 일치하지 않습니다.</Caption>}
      </InputWrapper>

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

const PasswordInput = styled(SignUpInput)`
  width: 100%;
`;

const Caption = styled.p`
  color: #697077;
`;

const NextButton = styled.button<{ disabled: boolean }>`
  width: 100%;
  height: 48px;
  background-color: ${({ disabled }) => (disabled ? "#c4c4c4" : "#2d3bae")};
  border-radius: 8px;
  color: white;
`;
