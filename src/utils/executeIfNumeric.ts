export const executeIfNumeric = (
  value: string,
  func: (value: string) => void
) => {
  if (!isNaN(Number(value)) || value === "") {
    func(value);
  }
};
