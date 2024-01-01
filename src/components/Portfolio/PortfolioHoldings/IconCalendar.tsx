import CalendarIcon from "@assets/icons/ic_calendar.svg?react";
import SvgIcon from "@mui/material/SvgIcon";
import designSystem from "@styles/designSystem";

export const IconCalendar = () => {
  return (
    <SvgIcon
      component={CalendarIcon}
      width={14}
      height={14}
      viewBox="0 0 14 14"
      htmlColor={designSystem.color.neutral.gray600}
    />
  );
};
