import designSystem, { colors } from "@styles/designSystem";
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
  disabled?: boolean;
  onClick?: () => void;
};

export function Icon({ size, icon, color, disabled, onClick }: Props) {
  const iconUrl = `/src/assets/icons/ic_${icon}.svg`;

  return (
    <StyledIcon
      $size={size}
      $iconUrl={iconUrl}
      $color={colors[color]}
      $disabled={Boolean(disabled)}
      $hasOnClick={Boolean(onClick)}
      onClick={onClick}
    />
  );
}

const StyledIcon = styled.div<{
  $iconUrl: string;
  $size: IconSize;
  $color: string;
  $disabled: boolean;
  $hasOnClick: boolean;
}>`
  width: ${({ $size }) => `${$size}px`};
  height: ${({ $size }) => `${$size}px`};

  background-color: ${({ $color, $disabled }) =>
    $disabled ? designSystem.color.neutral.gray400 : $color};

  cursor: ${({ $disabled, $hasOnClick }) =>
    `${$disabled ? "not-allowed" : $hasOnClick && "pointer"} `};

  -webkit-mask-image: url(${({ $iconUrl }) => $iconUrl});
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: center;
`;
