import iconAdd from "@assets/icons/ic_add.svg?react";
import iconArrowLeft from "@assets/icons/ic_arrow-left.svg?react";
import iconAscending from "@assets/icons/ic_ascending.svg?react";
import iconCalendar from "@assets/icons/ic_calendar.svg?react";
import iconCheck from "@assets/icons/ic_check.svg?react";
import iconChevronDown from "@assets/icons/ic_chevron-down.svg?react";
import iconChevronLeft from "@assets/icons/ic_chevron-left.svg?react";
import iconChevronRight from "@assets/icons/ic_chevron-right.svg?react";
import iconChevronUp from "@assets/icons/ic_chevron-up.svg?react";
import iconClose from "@assets/icons/ic_close.svg?react";
import iconEdit from "@assets/icons/ic_edit.svg?react";
import iconFolderAdd from "@assets/icons/ic_folder-add.svg?react";
import iconHelp from "@assets/icons/ic_help.svg?react";
import iconIndet from "@assets/icons/ic_indet.svg?react";
import iconNotification from "@assets/icons/ic_notification.svg?react";
import iconRemove from "@assets/icons/ic_remove.svg?react";
import iconSearch from "@assets/icons/ic_search.svg?react";
import { styled } from "styled-components";

export type Icons =
  | "add"
  | "arrow-left"
  | "ascending"
  | "calendar"
  | "check"
  | "chevron-down"
  | "chevron-left"
  | "chevron-right"
  | "chevron-up"
  | "close"
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
  color: string;

  onClick?: () => void;
};

export default function Icon({ icon, size, color, onClick }: Props) {
  const IconComponent = getIconComponent(icon);

  return (
    <IconWrapper
      $size={size}
      // $color={getIconColor(variant, disabled)}
      $color={color}
      // $noFilter={noFilter}
      onClick={onClick}
      // style={style}
    >
      <IconComponent />
    </IconWrapper>
  );
}

// const getIconColor = (variant: Variant, disabled: boolean = false) => {
//   switch (variant) {
//     case "primary":
//       return "brightness(0) saturate(100%) invert(100%) sepia(1%) saturate(774%) hue-rotate(227deg) brightness(116%) contrast(100%)";
//     case "secondary":
//       return disabled
//         ? "brightness(0) saturate(100%) invert(85%) sepia(26%) saturate(5537%) hue-rotate(191deg) brightness(98%) contrast(87%)"
//         : "brightness(0) saturate(100%) invert(23%) sepia(77%) saturate(2431%) hue-rotate(208deg) brightness(102%) contrast(83%)";
//     case "tertiary":
//       return disabled
//         ? "brightness(0) saturate(100%) invert(91%) sepia(12%) saturate(169%) hue-rotate(197deg) brightness(82%) contrast(86%)"
//         : "brightness(0) saturate(100%)invert(45%) sepia(0%) saturate(339%) hue-rotate(279deg) brightness(103%) contrast(90%)";
//     default:
//       throw new Error("버튼 타입이 잘못되었습니다.");
//   }
// };

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
  cursor: pointer;

  svg {
    color: ${({ $color }) => $color};
  }
`;

const getIconComponent = (icon: string) => {
  switch (icon) {
    case "add":
      return iconAdd;
    case "arrow-left":
      return iconArrowLeft;
    case "ascending":
      return iconAscending;
    case "calendar":
      return iconCalendar;
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
    case "close":
      return iconClose;
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
