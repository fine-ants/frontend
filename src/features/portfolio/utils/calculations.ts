export const calculateRate = (val1: number, val2: number) => {
  const rate = ((val1 - val2) / val2) * 100;
  return rate;
};

export const calculateLossRate = (val1: number, val2: number) => {
  const rate = ((val1 - val2) / val1) * 100;
  return rate;
};

export const calculateValueFromRate = (rate: number, base: number) => {
  const value = base + (rate / 100) * base;
  return value;
};

export function applyDecimals(value: number, decimalPlaces: number = 2) {
  if (value % 1 === 0) {
    return value;
  } else {
    return parseFloat(value.toFixed(decimalPlaces));
  }
}

export function removeNegativeSign(value: string) {
  return value.replace("-", "");
}
