import { ColorType, getColor } from "@styles/designSystem";
import { MouseEvent, ReactNode } from "react";
import styled from "styled-components";
import { ColorObjectType, ColorTableType, DefaultColorType } from "./types";

type SizeType = "h24" | "h32";

type VariantType = "default" | "underline";

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
  customColor: ColorObjectType;
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

  const colorTable: ColorTableType = {
    primary: {
      color: "blue500",
      hoverColor: "blue50",
    },
    gray: {
      color: "gray600",
      hoverColor: "gray50",
    },
    white: {
      color: "white",
      hoverColor: "gray800",
    },
  };

  const colorObject =
    color === "custom" && "customColor" in props
      ? props.customColor
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

const StyledButton = styled.button<{
  $size: SizeType;
  $variant: VariantType;
  $colorObject: {
    color: ColorType;
    hoverColor: ColorType;
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
  color: ${({ $colorObject }) => getColor($colorObject.color)};
  ${({ $disabled }) => $disabled && "opacity: 0.5;"}

  &:hover {
    ${({ $variant, $colorObject }) =>
      $variant === "default"
        ? `background-color: ${getColor($colorObject.hoverColor)};`
        : "text-decoration: underline;"}
  }
`;
