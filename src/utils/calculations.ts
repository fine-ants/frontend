export const calculateRate = (num1: number, num2: number) => {
  return ((num1 - num2) / num2) * 100;
};

export const calculateValue = (rate: number, base: number) => {
  const value = base + (rate / 100) * base;

  return Math.floor(value) === value ? value.toString() : value.toFixed(2);
};
