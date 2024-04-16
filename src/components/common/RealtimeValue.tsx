import designSystem from "@styles/designSystem";
import { ReactNode, memo, useEffect, useRef, useState } from "react";
import styled from "styled-components";

type Props = {
  value: number;
  children: ReactNode;
};

type ValueStatus = "gain" | "loss" | "none";

export default memo(function RealtimeValue({ value, children }: Props) {
  const prevValue = useRef(value);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [status, setStatus] = useState<ValueStatus>("none");

  useEffect(() => {
    if (value > prevValue.current) {
      setStatus("gain");
    } else if (value < prevValue.current) {
      setStatus("loss");
    } else {
      setStatus("none");
    }

    prevValue.current = value;
  }, [value]);

  useEffect(() => {
    if (status !== "none") {
      timerRef.current = setTimeout(() => {
        setStatus("none");
      }, 2500);
    } else if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [status]);

  return <StyledPrice $status={status}>{children}</StyledPrice>;
});

const StyledPrice = styled.span<{ $status: ValueStatus }>`
  color: ${({ $status }) => {
    switch ($status) {
      case "none":
        return designSystem.color.neutral.gray900;
      case "gain":
        return designSystem.color.state.green500;
      case "loss":
        return designSystem.color.state.red500;
    }
  }};
`;
