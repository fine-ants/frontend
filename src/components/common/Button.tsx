import styled from "styled-components";

type Props = {
  variant: "primary" | "secondary" | "tertiary";
  height: 32 | 44;
  disabled?: boolean;
  children: React.ReactNode;
};

export default function Button({ variant, height, disabled, children }: Props) {
  switch (variant) {
    case "primary":
      return (
        <PrimaryButton $height={height} $disabled={disabled}>
          {children}
        </PrimaryButton>
      );
    case "secondary":
      return (
        <SecondaryButton $height={height} $disabled={disabled}>
          {children}
        </SecondaryButton>
      );
    case "tertiary":
      return (
        <TertiaryButton $height={height} $disabled={disabled}>
          {children}
        </TertiaryButton>
      );
    default:
      throw new Error("버튼 타입이 잘못되었습니다.");
  }
}

const BaseButton = styled.button<{ $height: number; $disabled?: boolean }>`
  min-width: ${({ $height }) => ($height === 32 ? "80px" : "128px")};
  height: ${({ $height }) => $height}px;
  padding: ${({ $height }) => ($height === 32 ? "0 12px" : "0 16px")};
  font: ${({ $height, theme: { font } }) =>
    $height === 32 ? font.button2 : font.button1};
  border-radius: ${({ $height }) => ($height === 32 ? "3px" : "4px")};
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
`;

const PrimaryButton = styled(BaseButton)`
  color: ${({ theme: { color } }) => color.neutral.white};
  background-color: ${({ theme: { color }, $disabled }) =>
    $disabled ? color.primary.blue200 : color.primary.blue500};

  &:hover {
    background-color: ${({ theme: { color }, $disabled }) =>
      $disabled ? color.primary.blue200 : color.primary.blue700};
  }
`;

const SecondaryButton = styled(BaseButton)`
  color: ${({ theme: { color }, $disabled }) =>
    $disabled ? color.primary.blue200 : color.primary.blue500};
  border: 1px solid ${({ theme: { color } }) => color.primary.blue500};
  background-color: ${({ theme: { color }, $disabled }) =>
    $disabled ? color.primary.blue50008 : color.neutral.white};

  &:hover {
    background-color: ${({ theme: { color } }) => color.primary.blue50008}
`;

const TertiaryButton = styled(BaseButton)`
  color: ${({ theme: { color }, $disabled }) =>
    $disabled ? color.neutral.gray400 : color.neutral.gray600};
  border: 1px solid
    ${({ theme: { color }, $disabled }) =>
      $disabled ? color.neutral.gray400 : color.neutral.gray600};
  background-color: ${({ theme: { color }, $disabled }) =>
    $disabled ? color.neutral.gray50 : color.neutral.white};

  &:hover {
    background-color: ${({ theme: { color } }) => color.neutral.gray50};
  }
`;
