import { colors } from "@styles/designSystem";
import { MouseEvent, useState } from "react";
import styled from "styled-components";
import { Icon, IconType } from "../Icon";

type DesignSystemColorType = keyof typeof colors;

type SizeType = "h24" | "h40";

type DefaultColorType = "primary" | "gray" | "white";

type ColorObjectType = {
  iconColor: DesignSystemColorType;
  hoverColor: DesignSystemColorType;
};

type DefaultProps = {
  icon: IconType;
  iconColor?: DefaultColorType;
  hoverIconColor?: DesignSystemColorType;
  hoverIcon?: IconType;
  size: SizeType;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};

type CustomProps = {
  icon: IconType;
  iconColor: "custom";
  hoverIconColor?: DesignSystemColorType;
  hoverIcon?: IconType;
  customColor: ColorObjectType;
  size: SizeType;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};

type Props = DefaultProps | CustomProps;

type ColorTableType = Record<DefaultColorType, ColorObjectType>;

export function IconButton(props: Props) {
  const {
    icon,
    iconColor = "primary",
    size,
    type,
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
      iconColor: "blue500",
      hoverColor: "blue50",
    },
    gray: {
      iconColor: "gray600",
      hoverColor: "gray50",
    },
    white: {
      iconColor: "white",
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
        color={
          isHovered && hoverIconColor ? hoverIconColor : colorObject.iconColor
        }
      />
    </StyledButton>
  );
}

const StyledButton = styled.button<{
  $size: SizeType;
  $colorObject: {
    iconColor: DesignSystemColorType;
    hoverColor: DesignSystemColorType;
  };
  $disabled: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ $size }) => ($size === "h24" ? "24px" : "40px")};
  height: ${({ $size }) => ($size === "h24" ? "24px" : "40px")};
  border-radius: 4px;
  color: ${({ $colorObject }) => colors[$colorObject.iconColor]};
  ${({ $disabled }) => $disabled && "opacity: 0.5;"}

  &:hover {
    background-color: ${({ $colorObject }) => colors[$colorObject.hoverColor]};
  }
`;
