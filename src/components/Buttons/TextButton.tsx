import designSystem, { ColorType, getColor } from "@styles/designSystem";
import { MouseEvent, ReactNode } from "react";
import styled from "styled-components";
import { ColorObjectType, ColorTableType, DefaultColorType } from "./types";

type SizeType = "h24" | "h32";

type VariantType = "default" | "underline";

type DefaultProps = {
  variant?: "default";
  color?: DefaultColorType;
  size: SizeType;
  children: ReactNode;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};

type UnderlineProps = {
  variant: "underline";
  color?: DefaultColorType;
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

type Props = DefaultProps | UnderlineProps | CustomProps;

export function TextButton(props: Props) {
  const {
    variant = "default",
    color = "primary",
    children,
    type = "button",
    disabled = false,
    onClick,
    ...otherProps
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

  const size = variant === "default" && "size" in props ? props.size : null;

  return (
    <StyledButton
      $variant={variant}
      $size={size}
      $colorObject={colorObject}
      $disabled={disabled}
      disabled={disabled}
      type={type}
      onClick={onClick}
      {...otherProps}>
      {children}
    </StyledButton>
  );
}

const StyledButton = styled.button<{
  $size: SizeType | null;
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

  ${({ $size }) =>
    $size !== null && `min-width: ${$size === "h24" ? "56px" : "80px"};`};

  ${({ $size }) =>
    $size !== null
      ? `
      padding-inline:  ${$size === "h24" ? "8px" : "12px"};
      height: ${$size === "h24" ? "24px" : "32px"};
    `
      : "height: 17px;"}
  border-radius: ${({ $size }) => ($size === "h24" ? "2px" : "3px")};
  color: ${({ $colorObject }) => getColor($colorObject.color)};
  ${({ $disabled }) => $disabled && "opacity: 0.5;"}
  font : ${designSystem.font.button2.font};
  letter-spacing: ${designSystem.font.button2.letterSpacing};

  &:hover {
    ${({ $variant, $colorObject }) =>
      $variant === "default"
        ? `background-color: ${getColor($colorObject.hoverColor)};`
        : "text-decoration: underline;"}
  }
`;
