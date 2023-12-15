import { TextField } from "@mui/material";
import designSystem from "@styles/designSystem";
import styled from "styled-components";

export const AuthInput = styled(TextField)`
  .MuiOutlinedInput-input {
    display: flex;
    width: 100%;
    height: 46px;
    align-items: center;
    gap: 8px;
    border-radius: 4px;
    box-sizing: border-box;
    background: ${designSystem.color.neutral.white};
    box-sizing: border-box;
    font: ${designSystem.font.body3};
  }
  .MuiFormHelperText-root {
    margin: 0;
  }

  .MuiFormHelperText-root.Mui-error {
    color: ${designSystem.color.state.red};
  }
  .MuiFormHelperText-root {
    font: ${designSystem.font.body4};
  }

  &:hover .MuiOutlinedInput-notchedOutline,
  .Mui-focused .MuiOutlinedInput-notchedOutline,
  .MuiOutlinedInput-notchedOutline {
    border: 1px solid ${designSystem.color.neutral.gray200};
  }

  .Mui-error .MuiOutlinedInput-notchedOutline {
    border: 1px solid ${designSystem.color.state.red};
  }
`;
