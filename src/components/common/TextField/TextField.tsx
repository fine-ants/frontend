import closeIcon from "@assets/icons/ic_close.svg";
import { IconButton, InputAdornment } from "@mui/material";
import { ChangeEvent, useState } from "react";
import styled from "styled-components";
import { BaseTextField } from "./BaseTextField";
import { ErrorText } from "./ErrorText";

type Props = {
  id?: string;
  size?: "h24" | "h32" | "h44";
  error?: boolean;
  errorText?: string;
  placeholder?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  clearValue: () => void;
};

export function TextField({
  id,
  size = "h44",
  error,
  errorText,
  placeholder,
  value,
  onChange,
  clearValue,
}: Props) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const isError = value !== "" && error;

  return (
    <StyledTextFieldWrapper>
      <BaseTextField
        id={id ?? ""}
        size={size}
        error={isError}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        endAdornment={
          isFocused && (
            <InputAdornment position="end">
              <IconButton onMouseDown={clearValue}>
                <img src={closeIcon} />
              </IconButton>
            </InputAdornment>
          )
        }
      />
      {isError && errorText && <ErrorText>{errorText}</ErrorText>}
    </StyledTextFieldWrapper>
  );
}

const StyledTextFieldWrapper = styled.div`
  width: 100%;
  position: relative;
`;
