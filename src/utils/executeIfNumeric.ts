import { thousandsDelimiter } from "./delimiters";

export const executeIfNumeric = (
  value: string,
  func: (value: string) => void,
  commas: boolean = true
) => {
  const parsedValue = value.replace(/,/g, "");
  if (parsedValue === "") {
    func(parsedValue);
    return;
  }
  if (!isNaN(Number(parsedValue))) {
    func(commas ? thousandsDelimiter(Number(parsedValue)) : parsedValue);
  }
};
