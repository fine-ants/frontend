export const colors = {
  white: "#FFFFFF",
  white04: "#FFFFFF0A",
  white08: "#FFFFFF20",
  gray50: "#F5F6FC",
  gray100: "#EBECF4",
  gray200: "#E0E2EC",
  gray300: "#D1D2DE",
  gray400: "#B7B8C3",
  gray40016: "#B7B8C328",
  gray500: "#9E9FA9",
  gray600: "#75767F",
  gray700: "#525361",
  gray800: "#373840",
  gray900: "#212229",
  black: "#000000",
  blue50: "#E8EAFA",
  blue100: "#C4CAF3",
  blue200: "#9CA8EA",
  blue300: "#7186E3",
  blue400: "#4D6ADC",
  blue500: "#1F4FD5",
  blue50008: "#1F4FD520",
  blue600: "#1847CA",
  blue700: "#013DBE",
  blue800: "#001DA0",
  blue900: "#001DA0",
  green16: "#16C64828",
  green50: "#DAF6E2",
  green500: "#16C648",
  green800: "#375044",
  red16: "#FD494928",
  red50: "#FEE2E2",
  red500: "#FD4949",
  red800: "#53353C",
  orange16: "#FE8B2028",
  orange50: "#FFECDB",
  orange500: "#FE8B20",
  orange800: "#523F32",
  kakaoYellow: "#FEE500",
  naverGreen: "#02bd34",
};

const font = {
  display1: {
    font: "700 64px/77px 'IBM Plex Sans', sans-serif",
    letterSpacing: "-0.02rem",
  },
  display2: {
    font: "700 48px/58px 'IBM Plex Sans', sans-serif",
    letterSpacing: "-0.02rem",
  },
  display3: {
    font: "500 32px/39px 'IBM Plex Sans', sans-serif",
    letterSpacing: "-0.02rem",
  },

  heading1: {
    font: "500 48px/58px 'IBM Plex Sans', sans-serif",
    letterSpacing: "-0.02rem",
  },
  heading2: {
    font: "700 32px/39px 'IBM Plex Sans', sans-serif",
    letterSpacing: "-0.02rem",
  },
  heading3: {
    font: "700 24px/29px 'IBM Plex Sans', sans-serif",
    letterSpacing: "-0.02rem",
  },
  heading4: {
    font: "700 20px/24px 'IBM Plex Sans', sans-serif",
    letterSpacing: "-0.02rem",
  },

  title1: {
    font: "500 28px/34px 'IBM Plex Sans', sans-serif",
    letterSpacing: "-0.02rem",
  },
  title2: {
    font: "500 24px/29px 'IBM Plex Sans', sans-serif",
    letterSpacing: "-0.02rem",
  },
  title3: {
    font: "500 20px/24px 'IBM Plex Sans', sans-serif",
    letterSpacing: "-0.02rem",
  },
  title4: {
    font: "500 16px/19px 'IBM Plex Sans', sans-serif",
    letterSpacing: "-0.02rem",
  },
  title5: {
    font: "500 14px/17px 'IBM Plex Sans', sans-serif",
    letterSpacing: "-0.02rem",
  },
  title6: {
    font: "500 12px/14px 'IBM Plex Sans', sans-serif",
    letterSpacing: "-0.02rem",
  },
  title7: {
    font: "500 10px/12px 'IBM Plex Sans', sans-serif",
    letterSpacing: "-0.02rem",
  },

  body1: { font: "400 20px/30px 'IBM Plex Sans', sans-serif" },
  body2: { font: "400 16px/24px 'IBM Plex Sans', sans-serif" },
  body3: { font: "400 14px/21px 'IBM Plex Sans', sans-serif" },
  body4: { font: "400 12px/18px 'IBM Plex Sans', sans-serif" },

  button1: {
    font: "500 16px/19px 'IBM Plex Sans', sans-serif",
    letterSpacing: "-0.02rem",
  },
  button2: {
    font: "500 14px/17px 'IBM Plex Sans', sans-serif",
    letterSpacing: "-0.02rem",
  },
};

export default {
  color: {
    primary: {
      blue50: colors.blue50,
      blue100: colors.blue100,
      blue200: colors.blue200,
      blue300: colors.blue300,
      blue400: colors.blue400,
      blue500: colors.blue500,
      blue50008: colors.blue50008,
      blue600: colors.blue600,
      blue700: colors.blue700,
      blue800: colors.blue800,
      blue900: colors.blue900,
    },
    neutral: {
      white: colors.white,
      white04: colors.white04,
      white08: colors.white08,
      gray50: colors.gray50,
      gray100: colors.gray100,
      gray200: colors.gray200,
      gray300: colors.gray300,
      gray400: colors.gray400,
      gray40016: colors.gray40016,
      gray500: colors.gray500,
      gray600: colors.gray600,
      gray700: colors.gray700,
      gray800: colors.gray800,
      gray900: colors.gray900,
      black: colors.black,
    },
    state: {
      green16: colors.green16,
      green50: colors.green50,
      green500: colors.green500,
      green800: colors.green800,
      red16: colors.red16,
      red50: colors.red50,
      red500: colors.red500,
      red800: colors.red800,
      orange16: colors.orange16,
      orange50: colors.orange50,
      orange500: colors.orange500,
      orange800: colors.orange800,
    },
    kakao: {
      primary: colors.kakaoYellow,
    },
    naver: {
      primary: colors.naverGreen,
    },
  },

  font,
};

type RGB =
  | `rgb(${number}, ${number}, ${number})`
  | `rgb(${number},${number},${number})`;

type RGBA =
  | `rgba(${number}, ${number}, ${number}, ${number})`
  | `rgba(${number},${number},${number},${number})`;

type HEX = `#${string}`;

export type DesignSystemColorType = keyof typeof colors;

export type ColorType = DesignSystemColorType | RGB | RGBA | HEX;

export function validateColor(color: ColorType): boolean {
  const colorRegex =
    /^(#([A-Fa-f0-9]{6}([A-Fa-f0-9]{2})?|[A-Fa-f0-9]{3})|rgb\s*\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\)|rgba\s*\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*(0|1|0?\.\d+)\s*\))$/;

  return colorRegex.test(color);
}

export function getColor(color: ColorType) {
  const colorValue = colors[color as DesignSystemColorType];

  if (colorValue) {
    return colorValue;
  } else if (validateColor(color)) {
    return color;
  }

  throw new Error(`"${color}"은 유효하지 않은 색상 값입니다.`);
}
