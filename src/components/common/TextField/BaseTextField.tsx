import { OutlinedInput, OutlinedInputProps } from "@mui/material";
import designSystem from "@styles/designSystem";
import styled from "styled-components";

type Size = "h44" | "h32" | "h24";

type Props = {
  size: Size;
} & Omit<OutlinedInputProps, "size">;

export function BaseTextField({ size, ...rest }: Props) {
  return <TextField {...rest} $size={size} />;
}

const SIZE_TO_CSS = {
  h44: `height: 44px;
      padding: 8px 12px;
      border-radius: 4px;`,

  h32: `height: 32px;
      padding: 4px 8px;
      border-radius: 3px;`,

  h24: `height: 24px;
      padding: 0px 8px;
      border-radius: 2px;`,
};

const TextField = styled(OutlinedInput)<{ $size: Size }>`
  width: 100%;
  border: none;
  background: ${designSystem.color.neutral.white};

  .MuiOutlinedInput-input {
    display: flex;
    width: 100%;
    ${({ $size }) => SIZE_TO_CSS[$size]}
    align-items: center;
    gap: 8px;
    box-sizing: border-box;
    background: ${designSystem.color.neutral.white};
    font: ${designSystem.font.body3};
  }

  &.Mui-focused .MuiOutlinedInput-notchedOutline,
  &:hover .MuiOutlinedInput-notchedOutline,
  .MuiOutlinedInput-notchedOutline {
    border: 1px solid ${designSystem.color.neutral.gray200};
  }

  &.Mui-error .MuiOutlinedInput-notchedOutline {
    border: 1px solid ${designSystem.color.state.red};
  }
`;
