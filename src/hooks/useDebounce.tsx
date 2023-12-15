import { useEffect, useState } from "react";

interface Props<T> {
  value: T;
  delay: number;
}

export function useDebounce<T>({ value, delay }: Props<T>): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
