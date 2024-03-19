import designSystem, { colors } from "@styles/designSystem";
import { MouseEvent, ReactNode } from "react";
import styled from "styled-components";

type DesignSystemColorType = keyof typeof colors;

type SizeType = "h24" | "h32";

type VariantType = "default" | "underline";

type DefaultColorType = "primary" | "gray" | "white";

type CustomColorType = {
  color: DesignSystemColorType;
  hoverColor: DesignSystemColorType;
};

type DefaultProps = {
  variant?: VariantType;
  color?: DefaultColorType;
  size: SizeType;
  children: ReactNode;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};

type CustomProps = {
  variant?: VariantType;
  color: "custom";
  customColor: CustomColorType;
  size: SizeType;
  children: ReactNode;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};

type Props = DefaultProps | CustomProps;

export function TextButton(props: Props) {
  const {
    variant = "default",
    color = "primary",
    size,
    children,
    type,
    disabled = false,
    onClick,
  } = props;

  const colorTable = {
    primary: {
      color: designSystem.color.primary.blue500,
      hoverColor: designSystem.color.primary.blue50,
    },
    gray: {
      color: designSystem.color.neutral.gray600,
      hoverColor: designSystem.color.neutral.gray50,
    },
    white: {
      color: designSystem.color.neutral.white,
      hoverColor: designSystem.color.neutral.gray800,
    },
  };

  const colorObject =
    color === "custom" && "customColor" in props
      ? getCustomColorTable(props.customColor)
      : colorTable[color as DefaultColorType];

  return (
    <StyledButton
      $variant={variant}
      $size={size}
      $colorObject={colorObject}
      $disabled={disabled}
      disabled={disabled}
      type={type}
      onClick={onClick}>
      {children}
    </StyledButton>
  );
}

const getCustomColorTable = (customColor: CustomColorType) => {
  return {
    color: colors[customColor.color],
    hoverColor: colors[customColor.hoverColor],
  };
};

const StyledButton = styled.button<{
  $size: SizeType;
  $variant: VariantType;
  $colorObject: {
    color: string;
    hoverColor: string;
  };
  $disabled: boolean;
}>`
  display: flex;
  gap: 6px;
  align-items: center;
  justify-content: center;
  min-width: ${({ $size }) => ($size === "h24" ? "56px" : "80px")};
  height: ${({ $size }) => ($size === "h24" ? "24px" : "32px")};
  padding-inline: ${({ $size }) => ($size === "h24" ? "8px" : "12px")};
  border-radius: ${({ $size }) => ($size === "h24" ? "2px" : "3px")};
  color: ${({ $colorObject }) => $colorObject.color};
  ${({ $disabled }) => $disabled && "opacity: 0.5;"}

  &:hover {
    ${({ $variant, $colorObject }) =>
      $variant === "default"
        ? `background-color: ${$colorObject.hoverColor};`
        : "text-decoration: underline;"}
  }
`;
