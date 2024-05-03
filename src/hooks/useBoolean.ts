import { useCallback, useState } from "react";

export const useBoolean = (initialState = false) => {
  const [state, setState] = useState(initialState);

  const setTrue = useCallback(() => {
    setState(true);
  }, []);

  const setFalse = useCallback(() => {
    setState(false);
  }, []);

  const setOpposite = useCallback(() => {
    setState((prev) => !prev);
  }, []);

  return { state, setState, setTrue, setFalse, setOpposite };
};
