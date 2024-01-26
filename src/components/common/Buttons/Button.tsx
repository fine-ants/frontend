import designSystem from "@styles/designSystem";
import { ForwardedRef, forwardRef } from "react";
import styled from "styled-components";

export type Variant = "primary" | "secondary" | "tertiary" | "text";
type Size = "h32" | "h44";

type Props = {
  variant: Variant;
  size: Size;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  style?: React.CSSProperties;
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
  }: Props,
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
  min-width: ${({ $size }) => ($size === "h32" ? "80px" : "128px")};
  height: ${({ $size }) => `${$size === "h32" ? 32 : 44}px`};
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
      case "text":
        return "inherit";
      default:
        throw new Error("버튼 타입이 잘못되었습니다.");
    }
  }};
  border-radius: ${({ $size }) => ($size === "h32" ? "3px" : "4px")};
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
      case "text":
        return "none";
      default:
        throw new Error("버튼 타입이 잘못되었습니다.");
    }
  }};
  font: ${({ $size }) =>
    $size === "h32"
      ? designSystem.font.button2.font
      : designSystem.font.button1.font};
  letter-spacing: ${({ $size }) =>
    $size === "h32"
      ? designSystem.font.button2.letterSpacing
      : designSystem.font.button1.letterSpacing};
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
      case "text":
        return $disabled
          ? designSystem.color.neutral.gray600
          : designSystem.color.neutral.white;
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
        case "text":
          return $disabled ? "inherit" : designSystem.color.neutral.gray800;
        default:
          throw new Error("버튼 타입이 잘못되었습니다.");
      }
    }};
  }

  img {
    filter: ${({ $disabled }) => ($disabled ? "opacity(45%)" : "none")};
  }
`;
