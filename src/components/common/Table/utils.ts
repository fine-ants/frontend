import { Order } from "./types";

// Natural sorting algorithm to account for numbers in strings
export function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  const getValue = (item: T) => {
    const value = item[orderBy];
    if (typeof value === "string") {
      // Split the string into parts of digits and non-digits
      const parsedValue: (string | number)[] = value
        .split(/(\d+)/)
        .map((part) =>
          isNaN(Number(part)) ? part.toLowerCase() : Number(part)
        );
      return parsedValue;
    }
    return [value]; // Return a single-element array for non-string values
  };

  const valueA = getValue(a);
  const valueB = getValue(b);

  let comparison = 0;
  for (let i = 0; i < Math.min(valueA.length, valueB.length); i++) {
    if (valueB[i] < valueA[i]) {
      // Sort valueA before valueB
      comparison = -1;
      break;
    }
    if (valueB[i] > valueA[i]) {
      // Sort valueB before valueA
      comparison = 1;
      break;
    }
  }

  return comparison;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getComparator<Item>(
  order: Order,
  orderBy: keyof Item
): (a: Item, b: Item) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
