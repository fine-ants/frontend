import iconAdd from "@assets/icons/ic_add_16.svg?react";
import iconAscending from "@assets/icons/ic_ascending_16.svg?react";
import iconCheck from "@assets/icons/ic_check_16.svg?react";
import iconChevronDown from "@assets/icons/ic_chevron-down_16.svg?react";
import iconChevronLeft from "@assets/icons/ic_chevron-left_16.svg?react";
import iconChevronRight from "@assets/icons/ic_chevron-right_16.svg?react";
import iconChevronUp from "@assets/icons/ic_chevron-up_16.svg?react";
import iconEdit from "@assets/icons/ic_edit_16.svg?react";
import iconFolderAdd from "@assets/icons/ic_folder-add_16.svg?react";
import iconHelp from "@assets/icons/ic_help_16.svg?react";
import iconIndet from "@assets/icons/ic_indet_16.svg?react";
import iconNotification from "@assets/icons/ic_notification_16.svg?react";
import iconRemove from "@assets/icons/ic_remove_16.svg?react";
import iconSearch from "@assets/icons/ic_search_16.svg?react";

import { styled } from "styled-components";
import { Variant } from "./Buttons/Button";

export type Icons =
  | "add"
  | "ascending"
  | "check"
  | "chevron-down"
  | "chevron-left"
  | "chevron-right"
  | "chevron-up"
  | "edit"
  | "folder-add"
  | "help"
  | "indent"
  | "notification"
  | "remove"
  | "search";

type Props = {
  icon: Icons;
  size: number;
  variant: Variant;
  disabled?: boolean;
  noFilter?: boolean;
  onClick?: () => void;
};

export default function Icon({
  icon,
  size,
  variant,
  disabled,
  noFilter,
  onClick,
}: Props) {
  const IconComponent = getIconComponent(icon);

  return (
    <IconWrapper
      $size={size}
      $color={getIconColor(variant, disabled)}
      $noFilter={noFilter}
      onClick={onClick}>
      <IconComponent />
    </IconWrapper>
  );
}

const getIconColor = (variant: Variant, disabled: boolean = false) => {
  switch (variant) {
    case "primary":
      return "brightness(0) saturate(100%) invert(100%) sepia(1%) saturate(774%) hue-rotate(227deg) brightness(116%) contrast(100%)";
    case "secondary":
      return disabled
        ? "brightness(0) saturate(100%) invert(85%) sepia(26%) saturate(5537%) hue-rotate(191deg) brightness(98%) contrast(87%)"
        : "brightness(0) saturate(100%) invert(23%) sepia(77%) saturate(2431%) hue-rotate(208deg) brightness(102%) contrast(83%)";
    case "tertiary":
      return disabled
        ? "brightness(0) saturate(100%) invert(91%) sepia(12%) saturate(169%) hue-rotate(197deg) brightness(82%) contrast(86%)"
        : "brightness(0) saturate(100%)invert(45%) sepia(0%) saturate(339%) hue-rotate(279deg) brightness(103%) contrast(90%)";
    default:
      throw new Error("버튼 타입이 잘못되었습니다.");
  }
};

const IconWrapper = styled.div<{
  $size: number;
  $color: string;
  $noFilter?: boolean;
}>`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  display: flex;
  align-items: center;
  justify-content: center;

  filter: ${({ $color, $noFilter }) => ($noFilter ? "none" : $color)};

  svg {
    filter: ${({ $color }) => $color}};
    
  }
`;

const getIconComponent = (icon: string) => {
  switch (icon) {
    case "add":
      return iconAdd;
    case "ascending":
      return iconAscending;
    case "check":
      return iconCheck;
    case "chevron-down":
      return iconChevronDown;
    case "chevron-left":
      return iconChevronLeft;
    case "chevron-right":
      return iconChevronRight;
    case "chevron-up":
      return iconChevronUp;
    case "edit":
      return iconEdit;
    case "folder-add":
      return iconFolderAdd;
    case "help":
      return iconHelp;
    case "indent":
      return iconIndet;
    case "notification":
      return iconNotification;
    case "remove":
      return iconRemove;
    case "search":
      return iconSearch;

    default:
      throw new Error("잘못된 아이콘입니다.");
  }
};
