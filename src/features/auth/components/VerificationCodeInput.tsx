import { ErrorText } from "@components/TextField/ErrorText";
import designSystem from "@styles/designSystem";
import VerificationInput from "react-verification-input";
import styled from "styled-components";

type Props = {
  isError: boolean;
  value: string;
  inputLength: number;
  onChange: (digits: string) => void;
  onComplete: (digits: string) => void;
};

export default function VerificationCodeInput({
  value,
  isError,
  inputLength,
  onChange,
  onComplete,
}: Props) {
  return (
    <StyledVerificationCodeInput $isError={isError}>
      <VerificationInput
        value={value}
        validChars="0-9"
        inputProps={{ inputMode: "numeric" }}
        length={inputLength}
        placeholder=""
        classNames={{
          container: "container",
          character: "character",
          characterSelected: "character--selected",
        }}
        onChange={onChange}
        onComplete={onComplete}
      />
      {isError && <ErrorText>인증번호가 일치하지 않습니다</ErrorText>}
    </StyledVerificationCodeInput>
  );
}

const StyledVerificationCodeInput = styled.div<{ $isError: boolean }>`
  .container {
    width: 100%;
  }

  .character {
    width: 48px;
    height: 48px;
    background: ${designSystem.color.neutral.white};
    border: 1px solid
      ${({ $isError }) =>
        $isError
          ? designSystem.color.state.red500
          : designSystem.color.neutral.gray200};
    border-radius: 4px;
    font-size: 20px;
    color: ${designSystem.color.neutral.gray900};
    outline: none;
  }

  .character--selected {
    border: 1px solid
      ${({ $isError }) =>
        $isError
          ? designSystem.color.state.red500
          : designSystem.color.primary.blue500};
  }
`;
