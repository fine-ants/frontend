import { useBoolean } from "@fineants/demolition";
import { InputAdornment } from "@mui/material";
import designSystem from "@styles/designSystem";
import { ChangeEvent, HTMLInputTypeAttribute, ReactNode } from "react";
import styled from "styled-components";
import { IconButton } from "../Buttons/IconButton";
import { BaseTextField, Size } from "./BaseTextField";
import { ErrorText } from "./ErrorText";

type Props = {
  id?: string;
  size?: Size;
  error?: boolean;
  errorText?: string;
  placeholder?: string;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  disabled?: boolean;
  value: string;
  type?: HTMLInputTypeAttribute;
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
  type = "text",
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
        type={type}
        id={id ?? undefined}
        size={size}
        error={isError}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        disabled={disabled}
        autoCapitalize="none"
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
