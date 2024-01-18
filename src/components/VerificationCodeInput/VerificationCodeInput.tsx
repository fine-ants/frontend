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
    font-size: 20px;
    border-radius: 8px;

    width: 44px;
    min-height: 44px;
    color: #272729;
    border-radius: 4px;
    border: 1px solid
      ${({ $isError }) =>
        $isError
          ? designSystem.color.state.red
          : designSystem.color.neutral.gray200};
    background: ${designSystem.color.neutral.white};
  }

  .character--selected {
    border: 1px solid
      ${({ $isError }) =>
        $isError
          ? designSystem.color.state.red
          : designSystem.color.primary.blue500};
  }
`;

const ErrorText = styled.div`
  color: ${designSystem.color.state.red};
  font: ${designSystem.font.body4};
`;
