import styled from "styled-components";

//TODO : MUI 적용

type VariantType = "primary" | "secondary" | "tertiary";

type Props = {
  variant: VariantType;
  height: "S" | "M";
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
};

export default function Button({
  variant,
  height,
  disabled,
  onClick,
  children,
}: Props) {
  return (
    <StyledButton
      $variant={variant}
      $height={height}
      $disabled={disabled}
      onClick={onClick}>
      {children}
    </StyledButton>
  );
}

const StyledButton = styled.button<{
  $variant: VariantType;
  $height: string;
  $disabled?: boolean;
}>`
  color: ${({ theme: { color }, $variant, $disabled }) => {
    switch ($variant) {
      case "primary":
        return $disabled ? color.primary.blue200 : color.neutral.white;
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
        return $disabled ? color.primary.blue50008 : color.neutral.white;
      case "tertiary":
        return $disabled ? color.neutral.gray50 : color.neutral.white;
      default:
        throw new Error("버튼 타입이 잘못되었습니다.");
    }
  }};

  border: ${({ theme: { color }, $variant }) => {
    switch ($variant) {
      case "primary":
        return `1px solid ${color.primary.blue500}`;
      case "secondary":
        return `1px solid ${color.primary.blue500}`;
      case "tertiary":
        return `1px solid ${color.neutral.gray600}`;
      default:
        throw new Error("버튼 타입이 잘못되었습니다.");
    }
  }};

  min-width: ${({ $height }) => ($height === "S" ? "80px" : "128px")};
  height: ${({ $height }) => $height}px;
  padding: ${({ $height }) => ($height === "S" ? "0 12px" : "0 16px")};
  font: ${({ $height, theme: { font } }) =>
    $height === "S" ? font.button2 : font.button1};
  border-radius: ${({ $height }) => ($height === "S" ? "3px" : "4px")};
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};

  &:hover {
    background-color: ${({ theme: { color }, $variant, $disabled }) => {
      switch ($variant) {
        case "primary":
          return $disabled ? color.primary.blue200 : color.primary.blue700;
        case "secondary":
          return color.primary.blue50008;
        case "tertiary":
          return color.neutral.gray50;
        default:
          throw new Error("버튼 타입이 잘못되었습니다.");
      }
    }};
  }
`;
