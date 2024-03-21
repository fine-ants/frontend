import { Theme, ThemeProvider, createTheme } from "@mui/material";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers";
import designSystem from "@styles/designSystem";
import { Dayjs } from "dayjs";
import { Icon } from "../Icon";

type Props = {
  size: "small" | "big";
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
  return (
    <ThemeProvider
      theme={size === "small" ? smallDatePickerTheme : bigDatePickerTheme}>
      <MuiDatePicker
        disabled={disabled}
        value={value}
        onChange={onChange}
        format="YYYY-MM-DD"
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

const bigDatePickerTheme = (theme: Theme) =>
  createTheme({
    ...theme,
    components: {
      MuiInputBase: {
        styleOverrides: {
          root: {
            "width": "352px",
            "height": "32px",
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

const smallDatePickerTheme = (theme: Theme) =>
  createTheme({
    ...theme,
    components: {
      MuiInputBase: {
        styleOverrides: {
          root: {
            "width": "127px",
            "height": "24px",
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
