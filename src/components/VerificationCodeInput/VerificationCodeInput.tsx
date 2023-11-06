import VerificationInput from "react-verification-input";
import styled from "styled-components";

type Props = {
  onComplete: (digits: string) => void;
};

export default function VerificationCodeInput({ onComplete }: Props) {
  return (
    <StyledVerificationCodeInput>
      <VerificationInput
        validChars="0-9"
        inputProps={{ inputMode: "numeric" }}
        length={6}
        placeholder=""
        classNames={{
          character: "character",
          characterSelected: "character--selected",
        }}
        onComplete={onComplete}
      />
    </StyledVerificationCodeInput>
  );
}

// TODO
const StyledVerificationCodeInput = styled.div`
  .character {
    font-size: 20px;
    border-radius: 8px;

    color: #272729;
    background-color: #f6f5fa;
    border: 3px solid lightgrey;
    box-shadow: 0 2px 0 #e4e2f5;
  }

  .character--selected {
    border: 3px solid grey;
  }
`;
