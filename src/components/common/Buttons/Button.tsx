import styled from "styled-components";

type Variant = "primary" | "secondary" | "tertiary";

type Props = {
  variant: Variant;
  size: 32 | 44;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
};

export default function Button({
  variant,
  size,
  disabled,
  onClick,
  children,
}: Props) {
  return (
    <StyledButton
      $variant={variant}
      $size={size}
      $disabled={disabled}
      onClick={onClick}>
      {children}
    </StyledButton>
  );
}

const StyledButton = styled.button<{
  $variant: Variant;
  $size: number;
  $disabled?: boolean;
}>`
  min-width: ${({ $size }) => ($size === 32 ? "80px" : "128px")};
  height: ${({ $size }) => `${$size}px`};
  padding-inline: ${({ $size }) => ($size === 32 ? "12px" : "16px")};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ $size }) => ($size === 32 ? "4px" : "8px")};
  background-color: ${({ theme: { color }, $variant, $disabled }) => {
    switch ($variant) {
      case "primary":
        return $disabled ? color.primary.blue200 : color.primary.blue500;
      case "secondary":
        return $disabled ? color.primary.blue50 : color.neutral.white;
      case "tertiary":
        return $disabled ? color.neutral.gray50 : color.neutral.white;
      default:
        throw new Error("버튼 타입이 잘못되었습니다.");
    }
  }};
  border-radius: ${({ $size }) => ($size === 32 ? "3px" : "4px")};
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
      default:
        throw new Error("버튼 타입이 잘못되었습니다.");
    }
  }};
  font: ${({ $size, theme: { font } }) =>
    $size === 32 ? font.button2 : font.button1};
  color: ${({ theme: { color }, $variant, $disabled }) => {
    switch ($variant) {
      case "primary":
        return color.neutral.white;
      case "secondary":
        return $disabled ? color.primary.blue200 : color.primary.blue500;
      case "tertiary":
        return $disabled ? color.neutral.gray400 : color.neutral.gray600;
      default:
        throw new Error("버튼 타입이 잘못되었습니다.");
    }
  }};
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
        default:
          throw new Error("버튼 타입이 잘못되었습니다.");
      }
    }};
  }

  img {
    filter: ${({ $disabled }) => ($disabled ? "opacity(45%)" : "none")};
  }
`;
