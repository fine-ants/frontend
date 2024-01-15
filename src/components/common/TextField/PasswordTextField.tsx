import hideIcon from "@assets/icons/ic_hide.svg";
import showIcon from "@assets/icons/ic_show.svg";
import { BaseTextField } from "@components/common/TextField/BaseTextField";
import { ErrorText } from "@components/common/TextField/ErrorText";
import { IconButton, InputAdornment } from "@mui/material";
import { ChangeEvent, useState } from "react";
import styled from "styled-components";

type Props = {
  error?: boolean;
  helperText?: string;
  placeholder?: string;
  password: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export function PasswordTextField({
  error,
  helperText,
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

  const isError = password !== "" && error;

  return (
    <StyledPasswordTextField>
      <BaseTextField
        size="h44"
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
              {showPassword ? <img src={hideIcon} /> : <img src={showIcon} />}
            </IconButton>
          </InputAdornment>
        }
      />
      {isError && helperText && <ErrorText>{helperText}</ErrorText>}
    </StyledPasswordTextField>
  );
}

const StyledPasswordTextField = styled.div`
  width: 100%;
  position: relative;
`;
