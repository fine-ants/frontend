import { ColorType, getColor } from "@styles/designSystem";
import { MouseEvent, useState } from "react";
import styled from "styled-components";
import { Icon, IconType } from "../Icon";
import { ColorObjectType, ColorTableType, DefaultColorType } from "./types";

type SizeType = "h24" | "h40";

type DefaultProps = {
  icon: IconType;
  iconColor?: DefaultColorType;
  hoverIconColor?: ColorType;
  hoverIcon?: IconType;
  size: SizeType;
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
    type = "button",
    disabled = false,
    hoverIcon,
    hoverIconColor,
    onClick,
  } = props;

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

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
      $size={size}
      $colorObject={colorObject}
      $disabled={disabled}
      disabled={disabled}
      type={type}
      onClick={onClick}>
      <Icon
        icon={isHovered && hoverIcon ? hoverIcon : icon}
        size={size === "h24" ? 16 : 24}
        color={isHovered && hoverIconColor ? hoverIconColor : colorObject.color}
      />
    </StyledButton>
  );
}

const StyledButton = styled.button<{
  $size: SizeType;
  $colorObject: {
    color: ColorType;
    hoverColor: ColorType;
  };
  $disabled: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${({ $size }) => ($size === "h24" ? "24px" : "40px")};
  height: ${({ $size }) => ($size === "h24" ? "24px" : "40px")};
  border-radius: 50%;
  color: ${({ $colorObject }) => getColor($colorObject.color)};
  ${({ $disabled }) => $disabled && "opacity: 0.5;"}

  &:hover {
    background-color: ${({ $colorObject }) =>
      getColor($colorObject.hoverColor)};
  }
`;
