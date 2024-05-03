import {
  removeThousandsDelimiter,
  thousandsDelimiter,
} from "@fineants/demolition";
import { useEffect, useState } from "react";

type Props = {
  initialValue?: string;
  validators?: Array<(value: number) => void>;
  delimiters?: boolean;
};

/**
 * This is a custom hook that handles numbers in a text input with optional input validators.
 *
 * @param {Object} [config] Optional.
 * @param {string} [config.initialValue] Initial value of the number text. Optional.
 * @param {Function[]} [config.validators] Array of validator functions. A validator receives the number value as a number type. Optional.
 * @param {boolean} [config.delimiters] Whether to use thousands delimiters. Optional.
 */
export default function useNumber(config?: Props) {
  const { initialValue = "", validators, delimiters = true } = config || {};

  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState("");

  const onChange = (newVal: string) => {
    if (!validators) {
      setValue(
        delimiters
          ? thousandsDelimiter(removeThousandsDelimiter(newVal))
          : newVal
      );
      return;
    }

    for (const validator of validators) {
      try {
        validator(Number(removeThousandsDelimiter(newVal)));
        setError("");
      } catch (error) {
        setError((error as Error).message);
        break;
      }
    }

    setValue(
      delimiters ? thousandsDelimiter(removeThousandsDelimiter(newVal)) : newVal
    );
  };

  useEffect(() => {
    onChange(initialValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isError = error !== "" && value !== "";

  return {
    value,
    error,
    isError,
    onChange,
  };
}
