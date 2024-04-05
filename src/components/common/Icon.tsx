import addIcon from "@assets/icons/ic_add.svg";
import arrowLeftIcon from "@assets/icons/ic_arrow-left.svg";
import ascendingIcon from "@assets/icons/ic_ascending.svg";
import calendarIcon from "@assets/icons/ic_calendar.svg";
import cameraIcon from "@assets/icons/ic_camera.svg";
import caption from "@assets/icons/ic_caption.svg";
import checkOutlineIcon from "@assets/icons/ic_check-outline.svg";
import checkIcon from "@assets/icons/ic_check.svg";
import chevronDownIcon from "@assets/icons/ic_chevron-down.svg";
import chevronLeftIcon from "@assets/icons/ic_chevron-left.svg";
import chevronRightIcon from "@assets/icons/ic_chevron-right.svg";
import chevronUpIcon from "@assets/icons/ic_chevron-up.svg";
import closeIcon from "@assets/icons/ic_close.svg";
import descendingIcon from "@assets/icons/ic_descending.svg";
import dividerIcon from "@assets/icons/ic_divider.svg";
import downIcon from "@assets/icons/ic_down.svg";
import editIcon from "@assets/icons/ic_edit.svg";
import favoriteIcon from "@assets/icons/ic_favorite.svg";
import favoriteAddIcon from "@assets/icons/ic_favorite_add.svg";
import favoriteRemoveIcon from "@assets/icons/ic_favorite_remove.svg";
import folderAddIcon from "@assets/icons/ic_folder-add.svg";
import helpIcon from "@assets/icons/ic_help.svg";
import hideIcon from "@assets/icons/ic_hide.svg";
import indetIcon from "@assets/icons/ic_indet.svg";
import infoIcon from "@assets/icons/ic_info.svg";
import noneIcon from "@assets/icons/ic_none.svg";
import notificationIcon from "@assets/icons/ic_notification.svg";
import refreshIcon from "@assets/icons/ic_refresh.svg";
import removeIcon from "@assets/icons/ic_remove.svg";
import searchIcon from "@assets/icons/ic_search.svg";
import settingsIcon from "@assets/icons/ic_settings.svg";
import showIcon from "@assets/icons/ic_show.svg";
import sortAscendingIcon from "@assets/icons/ic_sort_ascending.svg";
import sortDescendingIcon from "@assets/icons/ic_sort_descending.svg";
import sortNoneIcon from "@assets/icons/ic_sort_none.svg";
import trashIcon from "@assets/icons/ic_trash.svg";
import upIcon from "@assets/icons/ic_up.svg";
import userIcon from "@assets/icons/ic_user.svg";
import warningIcon from "@assets/icons/ic_warning.svg";

import { ColorType, getColor } from "@styles/designSystem";
import { styled } from "styled-components";

type IconSize = 12 | 16 | 24 | 32 | 48;

type Props = {
  size: IconSize;
  icon: IconType;
  color: ColorType;
  hoverColor?: ColorType;
};

export const icons = {
  "add": addIcon,
  "arrow-left": arrowLeftIcon,
  "ascending": ascendingIcon,
  "calendar": calendarIcon,
  "camera": cameraIcon,
  "caption": caption,
  "check-outline": checkOutlineIcon,
  "check": checkIcon,
  "chevron-down": chevronDownIcon,
  "chevron-left": chevronLeftIcon,
  "chevron-right": chevronRightIcon,
  "chevron-up": chevronUpIcon,
  "close": closeIcon,
  "descending": descendingIcon,
  "divider": dividerIcon,
  "down": downIcon,
  "edit": editIcon,
  "favorite": favoriteIcon,
  "favorite-add": favoriteAddIcon,
  "favorite-remove": favoriteRemoveIcon,
  "folder-add": folderAddIcon,
  "help": helpIcon,
  "hide": hideIcon,
  "indet": indetIcon,
  "info": infoIcon,
  "none": noneIcon,
  "notification": notificationIcon,
  "refresh": refreshIcon,
  "remove": removeIcon,
  "search": searchIcon,
  "settings": settingsIcon,
  "show": showIcon,
  "sort_ascending": sortAscendingIcon,
  "sort_descending": sortDescendingIcon,
  "sort_none": sortNoneIcon,
  "trash": trashIcon,
  "up": upIcon,
  "user": userIcon,
  "warning": warningIcon,
};

export type IconType = keyof typeof icons;

export function Icon({ size, icon, color, hoverColor }: Props) {
  const iconUrl = icons[icon];

  const colorValue = getColor(color);
  const hoverColorValue = getColor(hoverColor ?? color);

  return (
    <StyledIcon
      className="icon"
      $size={size}
      $iconUrl={iconUrl}
      $color={colorValue}
      $hoverColor={hoverColorValue}
    />
  );
}

const StyledIcon = styled.div<{
  $iconUrl: string;
  $size: IconSize;
  $color: string;
  $hoverColor?: string;
}>`
  width: ${({ $size }) => `${$size}px`};
  height: ${({ $size }) => `${$size}px`};
  background-color: ${({ $color }) => $color};
  mask-size: contain;
  mask-image: url(${({ $iconUrl }) => $iconUrl});
  mask-repeat: no-repeat;
  mask-position: center;
  -webkit-mask-image: url(${({ $iconUrl }) => $iconUrl});
  -webkit-mask-size: contain;
  -webkit-mask-position: center;
  -webkit-mask-repeat: no-repeat;

  &:hover {
    background-color: ${({ $hoverColor }) => $hoverColor};
  }
`;
