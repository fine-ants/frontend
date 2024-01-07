import CalendarIcon from "@assets/icons/ic_calendar.svg?react";
import SvgIcon from "@mui/material/SvgIcon";
import designSystem from "@styles/designSystem";

export const IconCalendar = () => {
  return (
    <SvgIcon
      component={CalendarIcon}
      width={14}
      height={14}
      inheritViewBox
      htmlColor={designSystem.color.neutral.gray600}
    />
  );
};
