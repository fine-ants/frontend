import designSystem from "@styles/designSystem";
import { ForwardedRef, forwardRef } from "react";
import styled from "styled-components";

export type Variant = "primary" | "secondary" | "tertiary" | "text";
type Size = "h32" | "h44";

type Props = {
  variant: Variant;
  size: Size;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  style?: React.CSSProperties;
};

export default forwardRef(function Button(
  { variant, size, disabled, onClick, children, style, ...props }: Props,
  ref: ForwardedRef<HTMLButtonElement>
) {
  return (
    <StyledButton
      ref={ref}
      $variant={variant}
      $size={size}
      $disabled={disabled}
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
  background-color: ${({ theme: { color }, $variant, $disabled }) => {
    switch ($variant) {
      case "primary":
        return $disabled ? color.primary.blue200 : color.primary.blue500;
      case "secondary":
        return $disabled ? color.primary.blue50 : color.neutral.white;
      case "tertiary":
        return $disabled ? color.neutral.gray50 : color.neutral.white;
      case "text":
        return "inherit";
      default:
        throw new Error("버튼 타입이 잘못되었습니다.");
    }
  }};
  border-radius: ${({ $size }) => ($size === "h32" ? "3px" : "4px")};
  border: ${({ theme: { color }, $variant, $disabled }) => {
    switch ($variant) {
      case "primary":
        return "none";
      case "secondary":
        return $disabled
          ? `1px solid ${color.primary.blue200}`
          : `1px solid ${color.primary.blue500}`;
      case "tertiary":
        return $disabled
          ? `1px solid ${color.neutral.gray400}`
          : `1px solid ${color.neutral.gray600}`;
      case "text":
        return "none";
      default:
        throw new Error("버튼 타입이 잘못되었습니다.");
    }
  }};
  font: ${({ $size, theme: { font } }) =>
    $size === "h32" ? font.button2.font : font.button1.font};
  color: ${({ theme: { color }, $variant, $disabled }) => {
    switch ($variant) {
      case "primary":
        return color.neutral.white;
      case "secondary":
        return $disabled ? color.primary.blue200 : color.primary.blue500;
      case "tertiary":
        return $disabled ? color.neutral.gray400 : color.neutral.gray600;
      case "text":
        return $disabled ? color.neutral.gray600 : color.neutral.white;
      default:
        throw new Error("버튼 타입이 잘못되었습니다.");
    }
  }};
  letter-spacing: ${designSystem.font.button1.letterSpacing}
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};

  &:hover {
    background-color: ${({ theme: { color }, $variant, $disabled }) => {
      switch ($variant) {
        case "primary":
          return $disabled ? color.primary.blue200 : color.primary.blue700;
        case "secondary":
          return color.primary.blue50;
        case "tertiary":
          return color.neutral.gray50;
        case "text":
          return $disabled ? "inherit" : color.neutral.gray800;
        default:
          throw new Error("버튼 타입이 잘못되었습니다.");
      }
    }};
  }

  img {
    filter: ${({ $disabled }) => ($disabled ? "opacity(45%)" : "none")};
  }
`;
