import designSystem from "@styles/designSystem";
import {
  CSSProperties,
  ForwardedRef,
  MouseEvent,
  ReactNode,
  forwardRef,
} from "react";
import styled from "styled-components";

export type Variant = "primary" | "secondary" | "tertiary";
type Size = "h24" | "h32" | "h40" | "h44" | "h48";

export type ButtonProps = {
  variant: Variant;
  size: Size;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
  style?: CSSProperties;
};

export default forwardRef(function Button(
  {
    variant,
    size,
    type = "button",
    disabled = false,
    onClick,
    children,
    style,
    ...props
  }: ButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
) {
  return (
    <StyledButton
      ref={ref}
      $variant={variant}
      $size={size}
      $disabled={disabled}
      type={type}
      disabled={disabled}
      onClick={onClick}
      style={style}
      {...props}>
      {children}
    </StyledButton>
  );
});

const StyledButton = styled.button<{
  $variant: Variant;
  $size: Size;
  $disabled?: boolean;
}>`
  white-space: nowrap;
  width: auto;
  min-width: ${({ $size }) => {
    switch ($size) {
      case "h24":
        return "56px";
      case "h32":
      case "h40":
        return "80px";
      case "h44":
      case "h48":
        return "128px";
    }
  }};
  height: ${({ $size }) => {
    switch ($size) {
      case "h24":
        return "24px";
      case "h32":
        return "32px";
      case "h40":
        return "40px";
      case "h44":
        return "44px";
      case "h48":
        return "48px";
    }
  }};
  padding-inline: ${({ $size }) => ($size === "h32" ? "12px" : "16px")};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ $size }) => ($size === "h32" ? "4px" : "8px")};
  background-color: ${({ $variant, $disabled }) => {
    switch ($variant) {
      case "primary":
        return $disabled
          ? designSystem.color.primary.blue200
          : designSystem.color.primary.blue500;
      case "secondary":
        return $disabled
          ? designSystem.color.primary.blue50
          : designSystem.color.neutral.white;
      case "tertiary":
        return $disabled
          ? designSystem.color.neutral.gray50
          : designSystem.color.neutral.white;
    }
  }};
  border-radius: ${({ $size }) => {
    switch ($size) {
      case "h24":
        return "2px";
      case "h32":
        return "3px";
      default:
        return "4px";
    }
  }};
  border: ${({ $variant, $disabled }) => {
    switch ($variant) {
      case "primary":
        return "none";
      case "secondary":
        return $disabled
          ? `1px solid ${designSystem.color.primary.blue200}`
          : `1px solid ${designSystem.color.primary.blue500}`;
      case "tertiary":
        return $disabled
          ? `1px solid ${designSystem.color.neutral.gray400}`
          : `1px solid ${designSystem.color.neutral.gray600}`;
      default:
        throw new Error("버튼 타입이 잘못되었습니다.");
    }
  }};
  font: ${({ $size }) =>
    $size === "h44" || $size === "h48"
      ? designSystem.font.button1.font
      : designSystem.font.button2.font};
  letter-spacing: ${({ $size }) =>
    $size === "h44" || $size === "h48"
      ? designSystem.font.button1.letterSpacing
      : designSystem.font.button2.letterSpacing};
  color: ${({ $variant, $disabled }) => {
    switch ($variant) {
      case "primary":
        return designSystem.color.neutral.white;
      case "secondary":
        return $disabled
          ? designSystem.color.primary.blue200
          : designSystem.color.primary.blue500;
      case "tertiary":
        return $disabled
          ? designSystem.color.neutral.gray400
          : designSystem.color.neutral.gray600;
      default:
        throw new Error("버튼 타입이 잘못되었습니다.");
    }
  }};
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};

  &:hover {
    background-color: ${({ $variant, $disabled }) => {
      switch ($variant) {
        case "primary":
          return $disabled
            ? designSystem.color.primary.blue200
            : designSystem.color.primary.blue700;
        case "secondary":
          return designSystem.color.primary.blue50;
        case "tertiary":
          return designSystem.color.neutral.gray50;
        default:
          throw new Error("버튼 타입이 잘못되었습니다.");
      }
    }};
  }

  img {
    filter: ${({ $disabled }) => ($disabled ? "opacity(45%)" : "none")};
  }
`;
