import styled from "styled-components";

//TODO : MUI 적용

type VariantType = "primary" | "secondary" | "tertiary";

type Props = {
  variant: VariantType;
  size: "S" | "M";
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
  $variant: VariantType;
  $size: string;
  $disabled?: boolean;
}>`
  color: ${({ theme: { color }, $variant, $disabled }) => {
    switch ($variant) {
      case "primary":
        return $disabled ? color.neutral.white : color.primary.white;
      case "secondary":
        return $disabled ? color.primary.blue200 : color.primary.blue500;
      case "tertiary":
        return $disabled ? color.neutral.gray400 : color.neutral.gray600;
      default:
        throw new Error("버튼 타입이 잘못되었습니다.");
    }
  }};

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

  border: ${({ theme: { color }, $variant, $disabled }) => {
    switch ($variant) {
      case "primary":
        return $disabled
          ? `1px solid ${color.primary.blue200}`
          : `1px solid ${color.primary.blue500}`;
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

  min-width: ${({ $size }) => ($size === "S" ? "80px" : "128px")};
  height: ${({ $size }) => ($size === "S" ? 32 : 44)}px;
  padding: ${({ $size }) => ($size === "S" ? "0 12px" : "0 16px")};
  font: ${({ $size, theme: { font } }) =>
    $size === "S" ? font.button2 : font.button1};
  border-radius: ${({ $size }) => ($size === "S" ? "3px" : "4px")};
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
    border: ${({ theme: { color }, $variant, $disabled }) => {
      switch ($variant) {
        case "primary":
          return $disabled
            ? `1px solid ${color.primary.blue200}`
            : `1px solid ${color.primary.blue700}`;
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
    }}
`;
