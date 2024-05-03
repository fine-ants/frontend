import { useBoolean } from "@hooks/useBoolean";
import { InputAdornment } from "@mui/material";
import designSystem from "@styles/designSystem";
import { ChangeEvent, ReactNode, useState } from "react";
import styled from "styled-components";
import { IconButton } from "../Buttons/IconButton";
import { BaseTextField } from "./BaseTextField";
import { ErrorText } from "./ErrorText";

type Props = {
  id?: string;
  size?: "h24" | "h32" | "h44";
  error?: boolean;
  errorText?: string;
  placeholder?: string;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  disabled?: boolean;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  clearValue?: () => void;
};

export function TextField({
  id,
  size = "h44",
  error,
  errorText,
  placeholder,
  startAdornment,
  endAdornment,
  disabled = false,
  value,
  onChange,
  clearValue,
}: Props) {
  const {
    state: isFocused,
    setTrue: handleFocus,
    setFalse: handleBlur,
  } = useBoolean();

  const isError = value !== "" && error;

  return (
    <StyledTextFieldWrapper>
      <BaseTextField
        id={id ?? undefined}
        size={size}
        error={isError}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        disabled={disabled}
        startAdornment={
          startAdornment && (
            <InputAdornment position="start" sx={startAdornmentSx}>
              {startAdornment}
            </InputAdornment>
          )
        }
        endAdornment={
          <InputAdornment position="end">{endAdornment}</InputAdornment> ??
          (isFocused && (
            <InputAdornment position="end">
              <IconButton
                icon="close"
                size="h24"
                iconColor="custom"
                customColor={{
                  color: "gray600",
                  hoverColor: "gray50",
                }}
                onClick={clearValue}
              />
            </InputAdornment>
          ))
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

const startAdornmentSx = {
  color: designSystem.color.neutral.gray600,
};
