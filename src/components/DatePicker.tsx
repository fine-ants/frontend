import useResponsiveLayout from "@hooks/useResponsiveLayout";
import { ThemeProvider, createTheme } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import designSystem from "@styles/designSystem";
import { Dayjs } from "dayjs";
import { Icon } from "./Icon";

type SizeType = "small" | "big";

type Props = {
  size: SizeType;
  disabled?: boolean;
  value: Dayjs | null;
  onChange: (newVal: Dayjs | null) => void;
};

export default function DatePicker({
  size,
  disabled = false,
  value,
  onChange,
}: Props) {
  const { isMobile } = useResponsiveLayout();

  return (
    <ThemeProvider theme={datePickerTheme(size, isMobile)}>
      <DesktopDatePicker
        disabled={disabled}
        value={value}
        onChange={onChange}
        format="YYYY-MM-DD"
        disableOpenPicker={false}
        slotProps={{
          textField: { placeholder: "매입 날짜" },
        }}
        slots={{
          openPickerIcon: () => {
            return <Icon icon="calendar" color="gray600" size={16} />;
          },
        }}
      />
    </ThemeProvider>
  );
}

const datePickerTheme = (size: SizeType, isMobile: boolean) => {
  const WIDTH_SIZE = isMobile ? "100%" : size === "small" ? "127px" : "352px";
  const HEIGHT_SIZE = isMobile
    ? size === "small"
      ? "32px"
      : "48px"
    : size === "small"
    ? "24px"
    : "32px";

  return createTheme({
    components: {
      MuiInputBase: {
        styleOverrides: {
          root: {
            "width": WIDTH_SIZE,
            "height": HEIGHT_SIZE,
            "padding": "0 0 0 8px",
            "font": designSystem.font.body3.font,
            "&:hover, &:focus-within": {
              fieldset: {
                border: `1px solid ${designSystem.color.primary.blue500} !important`,
              },
            },
            "fieldset": {
              border: `1px solid ${designSystem.color.neutral.gray200}`,
            },
          },
          input: {
            padding: "0 !important",
          },
        },
      },
    },
  });
};
