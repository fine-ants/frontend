export const calculateRate = (num1: number, num2: number) => {
  const rate = ((num1 - num2) / num2) * 100;

  return formatValue(rate);
};

export const calculateLossRate = (num1: number, num2: number) => {
  const rate = ((num1 - num2) / num1) * 100;

  return formatValue(rate);
};

export const calculateValue = (rate: number, base: number) => {
  const value = base + (rate / 100) * base;

  return formatValue(value);
};

function formatValue(value: number) {
  if (value % 1 === 0) {
    return value.toString();
  } else {
    return parseFloat(value.toFixed(2)).toString();
  }
}
