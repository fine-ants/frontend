export default function excludeDelimiters(
  str: string,
  delimeter: string = ","
) {
  return str.split(delimeter).join("");
}
