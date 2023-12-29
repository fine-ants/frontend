import { colors } from "@styles/designSystem";
import { styled } from "styled-components";

type IconType =
  | "add"
  | "arrow-left"
  | "ascending"
  | "calendar"
  | "camera"
  | "check-outline"
  | "check"
  | "chevron-down"
  | "chevron-left"
  | "chevron-right"
  | "chevron-up"
  | "close"
  | "descending"
  | "divider"
  | "down"
  | "edit"
  | "favorite"
  | "folder-add"
  | "help"
  | "hide"
  | "indet"
  | "none"
  | "notification"
  | "remove"
  | "search"
  | "settings"
  | "show"
  | "sort_ascending"
  | "sort_descending"
  | "sort_none"
  | "trash"
  | "up";

type ColorType = keyof typeof colors;

type IconSize = 24 | 16 | 12;

type Props = {
  size: IconSize;
  icon: IconType;
  color: ColorType;
};

export function Icon({ size, icon, color }: Props) {
  const iconUrl = `/src/assets/icons/ic_${icon}.svg`;

  return <StyledIcon $size={size} $iconUrl={iconUrl} $color={colors[color]} />;
}

const StyledIcon = styled.div<{
  $iconUrl: string;
  $size: IconSize;
  $color: string;
}>`
  width: ${({ $size }) => `${$size}px`};
  height: ${({ $size }) => `${$size}px`};

  background-color: ${({ $color }) => $color};

  mask-image: url(${({ $iconUrl }) => $iconUrl});
  mask-repeat: no-repeat;
  mask-position: center;
  -webkit-mask-image: url(${({ $iconUrl }) => $iconUrl});
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: center;
`;
