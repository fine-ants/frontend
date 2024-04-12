import {
  removeThousandsDelimiter,
  thousandsDelimiter,
} from "@fineants/demolition";

export const calculateRate = (val1: string, val2: string) => {
  const parsedVal1 = Number(removeThousandsDelimiter(val1));
  const parsedVal2 = Number(removeThousandsDelimiter(val2));

  const rate = ((parsedVal1 - parsedVal2) / parsedVal2) * 100;

  return thousandsDelimiter(applyDecimals(rate));
};

export const calculateLossRate = (val1: string, val2: string) => {
  const parsedVal1 = Number(removeThousandsDelimiter(val1));
  const parsedVal2 = Number(removeThousandsDelimiter(val2));

  const rate = ((parsedVal1 - parsedVal2) / parsedVal1) * 100;

  return thousandsDelimiter(applyDecimals(rate));
};

export const calculateValueFromRate = (rate: string, base: string) => {
  const parsedRate = Number(removeThousandsDelimiter(rate));
  const parsedBase = Number(removeThousandsDelimiter(base));

  const value = parsedBase + (parsedRate / 100) * parsedBase;

  return thousandsDelimiter(applyDecimals(value));
};

export function applyDecimals(value: number, decimalPlaces: number = 2) {
  if (value % 1 === 0) {
    return value;
  } else {
    return parseFloat(value.toFixed(decimalPlaces));
  }
}
