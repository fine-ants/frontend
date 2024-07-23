import { useBoolean } from "@fineants/demolition";
import { ColorType, getColor } from "@styles/designSystem";
import { ButtonHTMLAttributes, MouseEvent } from "react";
import styled from "styled-components";
import { Icon, IconType } from "../Icon";
import { ColorObjectType, ColorTableType, DefaultColorType } from "./types";

type SizeType = "h24" | "h32" | "h40";

type DefaultProps = {
  icon: IconType;
  hoverIcon?: IconType;
  size: SizeType;
  type?: "button" | "submit";
  disabled?: boolean;
  iconColor?: DefaultColorType;
  hoverIconColor?: ColorType;
  bgColor?: ColorType;
  borderRadius?: "default" | "rounded";
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
} & ButtonHTMLAttributes<HTMLButtonElement>;

type CustomProps = {
  icon: IconType;
  hoverIcon?: IconType;
  size: SizeType;
  type?: "button" | "submit";
  disabled?: boolean;
  iconColor: "custom";
  hoverIconColor?: ColorType;
  bgColor?: ColorType;
  customColor: ColorObjectType;
  borderRadius?: "default" | "rounded";
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
} & ButtonHTMLAttributes<HTMLButtonElement>;

type Props = DefaultProps | CustomProps;

export function IconButton(props: Props) {
  const {
    icon,
    hoverIcon,
    size,
    type = "button",
    disabled = false,
    iconColor = "primary",
    hoverIconColor,
    bgColor,
    borderRadius = "default",
    onClick,
    ...rest
  } = props;

  const buttonHTMLAttributes = Object.entries(rest).reduce(
    (acc, [key, value]) => {
      if (key === "customColor") return acc;
      return { ...acc, [key]: value };
    },
    {}
  );

  const {
    state: isHovered,
    setTrue: handleMouseEnter,
    setFalse: handleMouseLeave,
  } = useBoolean();

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
    iconColor === "custom" && "customColor" in props
      ? props.customColor
      : colorTable[iconColor as DefaultColorType];

  return (
    <StyledButton
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      disabled={disabled}
      type={type}
      onClick={onClick}
      $size={size}
      $disabled={disabled}
      $borderRadius={borderRadius}
      $colorObject={colorObject}
      $bgColor={bgColor}
      {...buttonHTMLAttributes}>
      <Icon
        icon={isHovered && hoverIcon ? hoverIcon : icon}
        size={getIconSize(size)}
        color={isHovered && hoverIconColor ? hoverIconColor : colorObject.color}
      />
    </StyledButton>
  );
}

const getIconSize = (size: SizeType) => {
  switch (size) {
    case "h24":
    case "h32":
      return 16;
    case "h40":
      return 24;
  }
};

const convertSizeToPixel = (sizeString: string) => {
  const sizeValue = Number(sizeString.replace("h", ""));

  if (!isNaN(sizeValue)) {
    return `${sizeValue}px`;
  } else {
    return "auto";
  }
};

const StyledButton = styled.button<{
  $size: SizeType;
  $disabled: boolean;
  $borderRadius: "default" | "rounded";
  $bgColor: ColorType | undefined;
  $colorObject: {
    color: ColorType;
    hoverColor: ColorType;
  };
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${({ $size }) => convertSizeToPixel($size)};
  height: ${({ $size }) => convertSizeToPixel($size)};
  border-radius: ${({ $size, $borderRadius }) =>
    $borderRadius === "rounded" ? "50%" : $size === "h32" ? "3px" : "4px"};
  color: ${({ $colorObject }) => getColor($colorObject.color)};
  ${({ $disabled }) => $disabled && "opacity: 0.5;"}
  background-color : ${({ $bgColor }) =>
    $bgColor ? getColor($bgColor) : "transparent"};

  &:hover {
    background-color: ${({ $colorObject, $disabled }) =>
      $disabled ? "transparent" : getColor($colorObject.hoverColor)};
  }
`;
