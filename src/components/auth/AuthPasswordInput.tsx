import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import {
  FormHelperText,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import designSystem from "@styles/designSystem";
import { ChangeEvent, useState } from "react";
import styled from "styled-components";

type Props = {
  error?: boolean;
  helperText?: string;
  placeholder?: string;
  password: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export function AuthPasswordInput({
  helperText,
  error,
  placeholder,
  password,
  onChange,
}: Props) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <AuthPasswordInputWrapper>
      <StyledOutlinedInput
        error={error}
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={onChange}
        placeholder={placeholder}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}>
              {showPassword ? (
                <VisibilityOffOutlinedIcon />
              ) : (
                <VisibilityOutlinedIcon />
              )}
            </IconButton>
          </InputAdornment>
        }
      />
      {error && helperText && (
        <StyledFormHelperText>{helperText}</StyledFormHelperText>
      )}
    </AuthPasswordInputWrapper>
  );
}

const AuthPasswordInputWrapper = styled.div`
  width: 100%;
`;

const StyledOutlinedInput = styled(OutlinedInput)`
  width: 100%;
  border: none;
  background: ${designSystem.color.neutral.white};

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

  &.Mui-focused .MuiOutlinedInput-notchedOutline,
  &:hover .MuiOutlinedInput-notchedOutline,
  .MuiOutlinedInput-notchedOutline {
    border: 1px solid ${designSystem.color.neutral.gray200};
  }

  &.Mui-error .MuiOutlinedInput-notchedOutline {
    border: 1px solid ${designSystem.color.state.red};
  }
`;

const StyledFormHelperText = styled(FormHelperText)`
  color: ${designSystem.color.state.red};
  font: ${designSystem.font.body4};
  margin: 0;
`;
