export default function splitAndIncludeDelimiter(
  str: string,
  delimiter: string
) {
  const regex = new RegExp(`(?<=${delimiter})|(?=${delimiter})`, "g");
  return str.split(regex);
}
