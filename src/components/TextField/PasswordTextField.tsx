import { BaseTextField, Size } from "@components/TextField/BaseTextField";
import { ErrorText } from "@components/TextField/ErrorText";
import { useBoolean } from "@fineants/demolition";
import { IconButton, InputAdornment } from "@mui/material";
import { ChangeEvent, MouseEvent } from "react";
import styled from "styled-components";
import { Icon } from "../Icon";

type Props = {
  id?: string;
  size?: Size;
  error?: boolean;
  errorText?: string;
  placeholder?: string;
  password: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export function PasswordTextField({
  id,
  size = "h44",
  error,
  errorText,
  placeholder,
  password,
  onChange,
}: Props) {
  const { state: showPassword, setOpposite: handleClickShowPassword } =
    useBoolean();

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const isError = password !== "" && error;

  return (
    <StyledPasswordTextField>
      <BaseTextField
        id={id ?? undefined}
        size={size}
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
              <Icon
                icon={showPassword ? "hide" : "show"}
                size={16}
                color="gray600"
              />
            </IconButton>
          </InputAdornment>
        }
      />
      {isError && errorText && <ErrorText>{errorText}</ErrorText>}
    </StyledPasswordTextField>
  );
}

const StyledPasswordTextField = styled.div`
  width: 100%;
  position: relative;
`;
