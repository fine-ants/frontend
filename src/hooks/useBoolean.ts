import { useState } from "react";

export const useBoolean = (initialState = false) => {
  const [state, setState] = useState(initialState);

  const setTrue = () => {
    setState(true);
  };

  const setFalse = () => {
    setState(false);
  };

  return { state, setTrue, setFalse };
};
