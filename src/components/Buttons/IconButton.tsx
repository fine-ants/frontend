import { useBoolean } from "@fineants/demolition";
import { ColorType, getColor } from "@styles/designSystem";
import { MouseEvent } from "react";
import styled from "styled-components";
import { Icon, IconType } from "../Icon";
import { ColorObjectType, ColorTableType, DefaultColorType } from "./types";

type SizeType = "h24" | "h32" | "h40";

type DefaultProps = {
  icon: IconType;
  iconColor?: DefaultColorType;
  hoverIconColor?: ColorType;
  hoverIcon?: IconType;
  size: SizeType;
  borderRadius?: "default" | "rounded";
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};

type CustomProps = {
  icon: IconType;
  iconColor: "custom";
  hoverIconColor?: ColorType;
  hoverIcon?: IconType;
  customColor: ColorObjectType;
  size: SizeType;
  borderRadius?: "default" | "rounded";
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};

type Props = DefaultProps | CustomProps;

export function IconButton(props: Props) {
  const {
    icon,
    iconColor = "primary",
    size,
    borderRadius = "default",
    type = "button",
    disabled = false,
    hoverIcon,
    hoverIconColor,
    onClick,
  } = props;

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
      $borderRadius={borderRadius}
      $colorObject={colorObject}
      $disabled={disabled}>
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
  $borderRadius: "default" | "rounded";
  $colorObject: {
    color: ColorType;
    hoverColor: ColorType;
  };
  $disabled: boolean;
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

  &:hover {
    background-color: ${({ $colorObject }) =>
      getColor($colorObject.hoverColor)};
  }
`;
