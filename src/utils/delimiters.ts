export function splitAndIncludeDelimiter(str: string, delimiter: string) {
  const regex = new RegExp(`(?<=${delimiter})|(?=${delimiter})`, "g");
  return str.split(regex);
}

export const thousandsDelimiter = (number: number): string => {
  return `${number.toLocaleString("ko")}`;
};
