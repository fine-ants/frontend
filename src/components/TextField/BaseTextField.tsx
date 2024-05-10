import { OutlinedInput, OutlinedInputProps } from "@mui/material";
import designSystem from "@styles/designSystem";
import styled from "styled-components";

export type Size = "h24" | "h32" | "h44" | "h48";

type Props = {
  size: Size;
} & Omit<OutlinedInputProps, "size">;

export function BaseTextField({ size, ...rest }: Props) {
  return <TextField {...rest} $size={size} />;
}

const INPUT_SIZE_TO_CSS = {
  h24: `
    height: 24px;
    padding: 0px 8px;
    border-radius: 2px;
  `,
  h32: `
      height: 32px;
      padding: 4px 0;
      border-radius: 3px;
  `,
  h44: `
    height: 44px;
    padding: 8px 0;
    border-radius: 4px;
  `,
  h48: `
      height: 48px;
      padding: 13.5px 0;
      border-radius: 4px;
  `,
};

const TEXT_FIELD_SIZE_TO_CSS = {
  h24: "padding: 0 8px;",
  h32: "padding: 0 8px;",
  h44: "padding: 0 12px;",
  h48: "padding: 0 12px;",
};

const TextField = styled(OutlinedInput)<{ $size: Size }>`
  width: 100%;
  border: none;
  background: ${designSystem.color.neutral.white};
  ${({ $size }) => TEXT_FIELD_SIZE_TO_CSS[$size]}

  .MuiInputAdornment-positionStart {
    margin-right: 3px;
  }

  .MuiOutlinedInput-input {
    width: 100%;
    ${({ $size }) => INPUT_SIZE_TO_CSS[$size]}
    display: flex;
    align-items: center;
    gap: 8px;
    box-sizing: border-box;
    background: ${designSystem.color.neutral.white};
    font: ${designSystem.font.body3.font};
  }

  &.Mui-focused .MuiOutlinedInput-notchedOutline,
  &:hover .MuiOutlinedInput-notchedOutline,
  .MuiOutlinedInput-notchedOutline {
    border: 1px solid ${designSystem.color.neutral.gray200};
  }

  &.Mui-error .MuiOutlinedInput-notchedOutline {
    border: 1px solid ${designSystem.color.state.red500};
  }
`;
