import { thousandsDelimiter } from "./delimiters";

export const executeIfNumeric = (
  value: string,
  func: (value: string) => void,
  commas: boolean = true
) => {
  const parsedValue = value.replace(/,/g, "");
  if (!isNaN(Number(parsedValue)) || parsedValue === "") {
    func(commas ? thousandsDelimiter(Number(parsedValue)) : parsedValue);
  }
};
