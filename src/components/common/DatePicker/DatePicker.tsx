import { ThemeProvider, createTheme } from "@mui/material";
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

const bigDatePickerTheme = createTheme({
  components: {
    MuiFormControl: {
      styleOverrides: {
        root: {
          width: "352px",
          height: "32px",
          border: "none",
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          width: "16px",
          height: "24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          width: "24px",
          height: "100%",
          margin: "0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: "0",
          margin: "0",
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          width: "100%",
          height: "100%",
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          width: "87px",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          display: "flex",
          padding: "4px 8px",
          justifyContent: "center",
          width: "352px",
          height: "32px",
          font: designSystem.font.body3.font,
          color: designSystem.color.neutral.gray400,
          borderColor: designSystem.color.neutral.gray100,
          backgroundColor: designSystem.color.neutral.white,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&:hover, &:focus-within": {
            ".MuiOutlinedInput-notchedOutline": {
              borderWidth: "1px",
              borderColor: designSystem.color.primary.blue500,
            },
          },
        },
        input: {
          "width": "304px",
          "height": "21px",
          "padding": "0 0 0 0",
          "font": designSystem.font.body3.font,
          "color": designSystem.color.neutral.gray900,
          "::placeholder": {
            color: designSystem.color.neutral.gray700,
          },
        },
      },
    },
  },
});

const smallDatePickerTheme = createTheme({
  components: {
    MuiFormControl: {
      styleOverrides: {
        root: {
          width: "127px",
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          width: "10px",
          height: "12px",
        },
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          width: "16px",
          height: "100%",
          margin: "0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: "0",
          margin: "0",
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          width: "32px",
          height: "100%",
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          width: "87px",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          display: "flex",
          padding: "0 8px",
          justifyContent: "center",
          width: "127px",
          height: "24px",
          font: designSystem.font.body3.font,
          backgroundColor: designSystem.color.neutral.white,
          textAlign: "left",
        },
        input: {},
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "padding": "0",
          "&:hover, &:focus-within": {
            ".MuiOutlinedInput-notchedOutline": {
              borderWidth: "1px",
              borderColor: designSystem.color.primary.blue500,
            },
          },
        },
        input: {
          width: "87px",
          padding: "0 0 0 0",
          font: designSystem.font.body3.font,
        },
      },
    },
  },
});
