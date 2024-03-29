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
  .character {
    width: 44px;
    min-height: 44px;
    background: ${designSystem.color.neutral.white};
    border: 1px solid
      ${({ $isError }) =>
        $isError
          ? designSystem.color.state.red500
          : designSystem.color.neutral.gray200};
    border-radius: 4px;
    font-size: 20px;
    color: #272729;
  }

  .character--selected {
    border: 1px solid
      ${({ $isError }) =>
        $isError
          ? designSystem.color.state.red500
          : designSystem.color.primary.blue500};
  }
`;

const ErrorText = styled.div`
  font: ${designSystem.font.body4.font};
  color: ${designSystem.color.state.red500};
`;
