import designSystem from "@styles/designSystem";
import { useState } from "react";
import styled from "styled-components";

export default function AlertDropdownInput() {
  const [targetPrice, setTargetPrice] = useState("");

  const onChangeTargetPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTargetPrice(e.target.value);
  };

  return (
    <InputWrapper>
      <input type="text" value={targetPrice} onChange={onChangeTargetPrice} />
      <span>₩</span>
    </InputWrapper>
  );
}

const InputWrapper = styled.div`
  width: 100%;
  height: 32px;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 5.5px 6px 8px;
  box-sizing: border-box;
  border-radius: 3px;
  border: 1px solid ${designSystem.color.neutral.gray200};
  background-color: ${designSystem.color.neutral.white};
  color: ${designSystem.color.neutral.gray400};

  > input {
    color: ${designSystem.color.neutral.gray800};
    width: 100%;
    height: 100%;
  }
`;
