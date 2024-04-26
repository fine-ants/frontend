import { ColorType } from "@styles/designSystem";

export type DefaultColorType = "primary" | "gray" | "white";

export type ColorObjectType = {
  color: ColorType;
  hoverColor: ColorType;
};

export type ColorTableType = Record<DefaultColorType, ColorObjectType>;
